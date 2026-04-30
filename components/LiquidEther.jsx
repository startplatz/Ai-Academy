'use client';

import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { getGpuTier, GPU_PRESETS } from '../utils/gpuTier';

/* ─────────────────────────────────────────────
   LIQUID ETHER – Navier-Stokes fluid simulation
   With adaptive GPU-tier quality & frame throttle.
   ───────────────────────────────────────────── */

const Wrapper = styled.div`
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  touch-action: none;
  /* Blur applied directly via filter (set inline by tier).
     MUCH cheaper than backdrop-filter on <main> because
     this is a single compositor layer — no backdrop sampling. */
`;

/* ── CSS fallback for "potato" tier ──────── */
const drift = keyframes`
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const FallbackBg = styled.div`
  position: fixed;
  inset: 0;
  z-index: 0;
  background: linear-gradient(
    135deg,
    rgba(124, 58, 237, 0.18),
    rgba(255, 159, 252, 0.14),
    rgba(180, 151, 207, 0.12),
    rgba(124, 58, 237, 0.18)
  );
  background-size: 400% 400%;
  animation: ${drift} 25s ease infinite;
  pointer-events: none;
`;

/* ── Load Three.js from CDN ────────────────── */
let threePromise = null;

function loadThree() {
  if (typeof window === 'undefined') return Promise.reject('SSR');
  if (window.THREE) return Promise.resolve(window.THREE);
  if (threePromise) return threePromise;

  threePromise = new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    s.crossOrigin = 'anonymous';
    s.onload = () => resolve(window.THREE);
    s.onerror = () => reject(new Error('Failed to load Three.js'));
    document.head.appendChild(s);
  });
  return threePromise;
}

/* ── GLSL Shaders ────────────────────────────── */

const face_vert = `
attribute vec3 position;
uniform vec2 px;
uniform vec2 boundarySpace;
varying vec2 uv;
precision highp float;
void main(){
  vec3 pos = position;
  vec2 scale = 1.0 - boundarySpace * 2.0;
  pos.xy = pos.xy * scale;
  uv = vec2(0.5)+(pos.xy)*0.5;
  gl_Position = vec4(pos, 1.0);
}
`;

const line_vert = `
attribute vec3 position;
uniform vec2 px;
precision highp float;
varying vec2 uv;
void main(){
  vec3 pos = position;
  uv = 0.5 + pos.xy * 0.5;
  vec2 n = sign(pos.xy);
  pos.xy = abs(pos.xy) - px * 1.0;
  pos.xy *= n;
  gl_Position = vec4(pos, 1.0);
}
`;

const mouse_vert = `
precision highp float;
attribute vec3 position;
attribute vec2 uv;
uniform vec2 center;
uniform vec2 scale;
uniform vec2 px;
varying vec2 vUv;
void main(){
  vec2 pos = position.xy * scale * 2.0 * px + center;
  vUv = uv;
  gl_Position = vec4(pos, 0.0, 1.0);
}
`;

const advection_frag = `
precision highp float;
uniform sampler2D velocity;
uniform float dt;
uniform bool isBFECC;
uniform vec2 fboSize;
uniform vec2 px;
varying vec2 uv;
void main(){
  vec2 ratio = max(fboSize.x, fboSize.y) / fboSize;
  if(isBFECC == false){
    vec2 vel = texture2D(velocity, uv).xy;
    vec2 uv2 = uv - vel * dt * ratio;
    vec2 newVel = texture2D(velocity, uv2).xy;
    gl_FragColor = vec4(newVel, 0.0, 0.0);
  } else {
    vec2 spot_new = uv;
    vec2 vel_old = texture2D(velocity, uv).xy;
    vec2 spot_old = spot_new - vel_old * dt * ratio;
    vec2 vel_new1 = texture2D(velocity, spot_old).xy;
    vec2 spot_new2 = spot_old + vel_new1 * dt * ratio;
    vec2 error = spot_new2 - spot_new;
    vec2 spot_new3 = spot_new - error / 2.0;
    vec2 vel_2 = texture2D(velocity, spot_new3).xy;
    vec2 spot_old2 = spot_new3 - vel_2 * dt * ratio;
    vec2 newVel2 = texture2D(velocity, spot_old2).xy;
    gl_FragColor = vec4(newVel2, 0.0, 0.0);
  }
}
`;

const color_frag = `
precision highp float;
uniform sampler2D velocity;
uniform sampler2D palette;
uniform vec4 bgColor;
varying vec2 uv;
void main(){
  vec2 vel = texture2D(velocity, uv).xy;
  float lenv = clamp(length(vel), 0.0, 1.0);
  vec3 c = texture2D(palette, vec2(lenv, 0.5)).rgb;
  vec3 outRGB = mix(bgColor.rgb, c, lenv);
  float outA = mix(bgColor.a, 1.0, lenv);
  gl_FragColor = vec4(outRGB, outA);
}
`;

const divergence_frag = `
precision highp float;
uniform sampler2D velocity;
uniform float dt;
uniform vec2 px;
varying vec2 uv;
void main(){
  float x0 = texture2D(velocity, uv-vec2(px.x, 0.0)).x;
  float x1 = texture2D(velocity, uv+vec2(px.x, 0.0)).x;
  float y0 = texture2D(velocity, uv-vec2(0.0, px.y)).y;
  float y1 = texture2D(velocity, uv+vec2(0.0, px.y)).y;
  float divergence = (x1 - x0 + y1 - y0) / 2.0;
  gl_FragColor = vec4(divergence / dt);
}
`;

const externalForce_frag = `
precision highp float;
uniform vec2 force;
uniform vec2 center;
uniform vec2 scale;
uniform vec2 px;
varying vec2 vUv;
void main(){
  vec2 circle = (vUv - 0.5) * 2.0;
  float d = 1.0 - min(length(circle), 1.0);
  d *= d;
  gl_FragColor = vec4(force * d, 0.0, 1.0);
}
`;

const poisson_frag = `
precision highp float;
uniform sampler2D pressure;
uniform sampler2D divergence;
uniform vec2 px;
varying vec2 uv;
void main(){
  float p0 = texture2D(pressure, uv + vec2(px.x * 2.0, 0.0)).r;
  float p1 = texture2D(pressure, uv - vec2(px.x * 2.0, 0.0)).r;
  float p2 = texture2D(pressure, uv + vec2(0.0, px.y * 2.0)).r;
  float p3 = texture2D(pressure, uv - vec2(0.0, px.y * 2.0)).r;
  float div = texture2D(divergence, uv).r;
  float newP = (p0 + p1 + p2 + p3) / 4.0 - div;
  gl_FragColor = vec4(newP);
}
`;

const pressure_frag = `
precision highp float;
uniform sampler2D pressure;
uniform sampler2D velocity;
uniform vec2 px;
uniform float dt;
varying vec2 uv;
void main(){
  float step = 1.0;
  float p0 = texture2D(pressure, uv + vec2(px.x * step, 0.0)).r;
  float p1 = texture2D(pressure, uv - vec2(px.x * step, 0.0)).r;
  float p2 = texture2D(pressure, uv + vec2(0.0, px.y * step)).r;
  float p3 = texture2D(pressure, uv - vec2(0.0, px.y * step)).r;
  vec2 v = texture2D(velocity, uv).xy;
  vec2 gradP = vec2(p0 - p1, p2 - p3) * 0.5;
  v = v - gradP * dt;
  gl_FragColor = vec4(v, 0.0, 1.0);
}
`;

const viscous_frag = `
precision highp float;
uniform sampler2D velocity;
uniform sampler2D velocity_new;
uniform float v;
uniform vec2 px;
uniform float dt;
varying vec2 uv;
void main(){
  vec2 old = texture2D(velocity, uv).xy;
  vec2 new0 = texture2D(velocity_new, uv + vec2(px.x * 2.0, 0.0)).xy;
  vec2 new1 = texture2D(velocity_new, uv - vec2(px.x * 2.0, 0.0)).xy;
  vec2 new2 = texture2D(velocity_new, uv + vec2(0.0, px.y * 2.0)).xy;
  vec2 new3 = texture2D(velocity_new, uv - vec2(0.0, px.y * 2.0)).xy;
  vec2 newv = 4.0 * old + v * dt * (new0 + new1 + new2 + new3);
  newv /= 4.0 * (1.0 + v * dt);
  gl_FragColor = vec4(newv, 0.0, 0.0);
}
`;

/* ── Component ───────────────────────────────── */

export default function LiquidEther({
  mouseForce = 20,
  cursorSize = 100,
  isViscous = false,
  viscous = 30,
  iterationsViscous = 32,
  iterationsPoisson = 32,
  dt = 0.014,
  BFECC = true,
  resolution = 0.5,
  isBounce = false,
  colors = ['#5227FF', '#FF9FFC', '#B497CF'],
  autoDemo = true,
  autoSpeed = 0.5,
  autoIntensity = 2.2,
  takeoverDuration = 0.25,
  autoResumeDelay = 1000,
  autoRampDuration = 0.6,
}) {
  const mountRef = useRef(null);
  const webglRef = useRef(null);
  const rafRef = useRef(null);
  const isVisibleRef = useRef(true);
  const [tier, setTier] = useState(null);

  /* Detect GPU tier on mount */
  useEffect(() => {
    const t = getGpuTier();
    setTier(t);
  }, []);

  /* Skip WebGL for potato tier */
  const preset = tier ? GPU_PRESETS[tier] : null;
  const isPotato = tier === 'potato';

  useEffect(() => {
    if (!mountRef.current || !tier || isPotato) return;
    let disposed = false;

    /* ── Apply tier overrides ── */
    const p = GPU_PRESETS[tier];
    const effectiveResolution = Math.min(resolution, p.resolution);
    const effectiveBFECC = BFECC && p.bfecc;
    const effectivePoisson = Math.min(iterationsPoisson, p.poisson);
    const effectiveViscousIter = Math.min(iterationsViscous, p.poisson);
    const maxPixelRatio = p.pixelRatio;
    const targetFPS = p.fps;
    const frameInterval = 1000 / targetFPS;

    loadThree().then((THREE) => {
      if (disposed || !mountRef.current) return;

      /* Validate shader strings (can be null after HMR) */
      const shaders = [face_vert, line_vert, mouse_vert, advection_frag, color_frag, divergence_frag, externalForce_frag, poisson_frag, pressure_frag, viscous_frag];
      if (shaders.some(s => !s || typeof s !== 'string')) {
        console.warn('[LiquidEther] Shader strings missing (HMR?), skipping init');
        return;
      }

      /* ── Palette texture ── */
      function makePaletteTexture(stops) {
        let arr = (Array.isArray(stops) && stops.length > 0)
          ? (stops.length === 1 ? [stops[0], stops[0]] : stops)
          : ['#ffffff', '#ffffff'];
        const w = arr.length;
        const data = new Uint8Array(w * 4);
        for (let i = 0; i < w; i++) {
          const c = new THREE.Color(arr[i]);
          data[i * 4] = Math.round(c.r * 255);
          data[i * 4 + 1] = Math.round(c.g * 255);
          data[i * 4 + 2] = Math.round(c.b * 255);
          data[i * 4 + 3] = 255;
        }
        const tex = new THREE.DataTexture(data, w, 1, THREE.RGBAFormat);
        tex.magFilter = THREE.LinearFilter;
        tex.minFilter = THREE.LinearFilter;
        tex.wrapS = THREE.ClampToEdgeWrapping;
        tex.wrapT = THREE.ClampToEdgeWrapping;
        tex.generateMipmaps = false;
        tex.needsUpdate = true;
        return tex;
      }

      const paletteTex = makePaletteTexture(colors);
      const bgVec4 = new THREE.Vector4(0, 0, 0, 0);

      /* ── Common ── */
      const Common = {
        width: 0, height: 0, aspect: 1, pixelRatio: 1,
        renderer: null, clock: null, time: 0, delta: 0,
        container: null,
        init(container) {
          this.container = container;
          this.pixelRatio = Math.min(window.devicePixelRatio || 1, maxPixelRatio);
          this.resize();
          this.renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
          this.renderer.autoClear = false;
          this.renderer.setClearColor(new THREE.Color(0x000000), 0);
          this.renderer.setPixelRatio(this.pixelRatio);
          this.renderer.setSize(this.width, this.height);
          this.renderer.domElement.style.width = '100%';
          this.renderer.domElement.style.height = '100%';
          this.renderer.domElement.style.display = 'block';
          this.clock = new THREE.Clock();
          this.clock.start();
        },
        resize() {
          if (!this.container) return;
          const rect = this.container.getBoundingClientRect();
          this.width = Math.max(1, Math.floor(rect.width));
          this.height = Math.max(1, Math.floor(rect.height));
          this.aspect = this.width / this.height;
          if (this.renderer) this.renderer.setSize(this.width, this.height, false);
        },
        update() {
          this.delta = this.clock.getDelta();
          this.time += this.delta;
        }
      };

      /* ── Mouse ── */
      const Mouse = {
        mouseMoved: false,
        coords: new THREE.Vector2(),
        coords_old: new THREE.Vector2(),
        diff: new THREE.Vector2(),
        timer: null,
        container: null,
        listenerTarget: null,
        isHoverInside: false,
        hasUserControl: false,
        isAutoActive: false,
        autoIntensity: autoIntensity,
        takeoverActive: false,
        takeoverStartTime: 0,
        takeoverDuration: takeoverDuration,
        takeoverFrom: new THREE.Vector2(),
        takeoverTo: new THREE.Vector2(),
        onInteract: null,

        init(container) {
          this.container = container;
          const win = window;
          this.listenerTarget = win;
          this._onMM = (e) => this.onMouseMove(e);
          this._onTS = (e) => this.onTouchStart(e);
          this._onTM = (e) => this.onTouchMove(e);
          this._onTE = () => { this.isHoverInside = false; };
          win.addEventListener('mousemove', this._onMM);
          win.addEventListener('touchstart', this._onTS, { passive: true });
          win.addEventListener('touchmove', this._onTM, { passive: true });
          win.addEventListener('touchend', this._onTE);
        },
        dispose() {
          if (!this.listenerTarget) return;
          this.listenerTarget.removeEventListener('mousemove', this._onMM);
          this.listenerTarget.removeEventListener('touchstart', this._onTS);
          this.listenerTarget.removeEventListener('touchmove', this._onTM);
          this.listenerTarget.removeEventListener('touchend', this._onTE);
        },
        isPointInside(cx, cy) {
          if (!this.container) return false;
          const r = this.container.getBoundingClientRect();
          return cx >= r.left && cx <= r.right && cy >= r.top && cy <= r.bottom;
        },
        setCoords(x, y) {
          if (!this.container) return;
          if (this.timer) clearTimeout(this.timer);
          const r = this.container.getBoundingClientRect();
          if (!r.width || !r.height) return;
          this.coords.set(((x - r.left) / r.width) * 2 - 1, -(((y - r.top) / r.height) * 2 - 1));
          this.mouseMoved = true;
          this.timer = setTimeout(() => { this.mouseMoved = false; }, 100);
        },
        setNormalized(nx, ny) {
          this.coords.set(nx, ny);
          this.mouseMoved = true;
        },
        onMouseMove(e) {
          this.isHoverInside = this.isPointInside(e.clientX, e.clientY);
          if (!this.isHoverInside) return;
          if (this.onInteract) this.onInteract();
          if (this.isAutoActive && !this.hasUserControl && !this.takeoverActive) {
            const r = this.container.getBoundingClientRect();
            if (!r.width || !r.height) return;
            this.takeoverFrom.copy(this.coords);
            this.takeoverTo.set(((e.clientX - r.left) / r.width) * 2 - 1, -(((e.clientY - r.top) / r.height) * 2 - 1));
            this.takeoverStartTime = performance.now();
            this.takeoverActive = true;
            this.hasUserControl = true;
            this.isAutoActive = false;
            return;
          }
          this.setCoords(e.clientX, e.clientY);
          this.hasUserControl = true;
        },
        onTouchStart(e) {
          if (e.touches.length !== 1) return;
          const t = e.touches[0];
          this.isHoverInside = this.isPointInside(t.clientX, t.clientY);
          if (!this.isHoverInside) return;
          if (this.onInteract) this.onInteract();
          this.setCoords(t.clientX, t.clientY);
          this.hasUserControl = true;
        },
        onTouchMove(e) {
          if (e.touches.length !== 1) return;
          const t = e.touches[0];
          this.isHoverInside = this.isPointInside(t.clientX, t.clientY);
          if (!this.isHoverInside) return;
          if (this.onInteract) this.onInteract();
          this.setCoords(t.clientX, t.clientY);
        },
        update() {
          if (this.takeoverActive) {
            const t = (performance.now() - this.takeoverStartTime) / (this.takeoverDuration * 1000);
            if (t >= 1) {
              this.takeoverActive = false;
              this.coords.copy(this.takeoverTo);
              this.coords_old.copy(this.coords);
              this.diff.set(0, 0);
            } else {
              const k = t * t * (3 - 2 * t);
              this.coords.copy(this.takeoverFrom).lerp(this.takeoverTo, k);
            }
          }
          this.diff.subVectors(this.coords, this.coords_old);
          this.coords_old.copy(this.coords);
          if (this.coords_old.x === 0 && this.coords_old.y === 0) this.diff.set(0, 0);
          if (this.isAutoActive && !this.takeoverActive) this.diff.multiplyScalar(this.autoIntensity);
        }
      };

      /* ── AutoDriver ── */
      class AutoDriver {
        constructor(mouse, manager, opts) {
          this.mouse = mouse;
          this.manager = manager;
          this.enabled = opts.enabled;
          this.speed = opts.speed;
          this.resumeDelay = opts.resumeDelay || 3000;
          this.rampDurationMs = (opts.rampDuration || 0) * 1000;
          this.active = false;
          this.current = new THREE.Vector2(0, 0);
          this.target = new THREE.Vector2();
          this.lastTime = performance.now();
          this.activationTime = 0;
          this.margin = 0.2;
          this._tmpDir = new THREE.Vector2();
          this.pickNewTarget();
        }
        pickNewTarget() {
          this.target.set((Math.random() * 2 - 1) * (1 - this.margin), (Math.random() * 2 - 1) * (1 - this.margin));
        }
        forceStop() { this.active = false; this.mouse.isAutoActive = false; }
        update() {
          if (!this.enabled) return;
          const now = performance.now();
          if (now - this.manager.lastUserInteraction < this.resumeDelay) { if (this.active) this.forceStop(); return; }
          if (this.mouse.isHoverInside) { if (this.active) this.forceStop(); return; }
          if (!this.active) { this.active = true; this.current.copy(this.mouse.coords); this.lastTime = now; this.activationTime = now; }
          this.mouse.isAutoActive = true;
          let dtSec = (now - this.lastTime) / 1000;
          this.lastTime = now;
          if (dtSec > 0.2) dtSec = 0.016;
          const dir = this._tmpDir.subVectors(this.target, this.current);
          const dist = dir.length();
          if (dist < 0.01) { this.pickNewTarget(); return; }
          dir.normalize();
          let ramp = 1;
          if (this.rampDurationMs > 0) { const t = Math.min(1, (now - this.activationTime) / this.rampDurationMs); ramp = t * t * (3 - 2 * t); }
          this.current.addScaledVector(dir, Math.min(this.speed * dtSec * ramp, dist));
          this.mouse.setNormalized(this.current.x, this.current.y);
        }
      }

      /* ── ShaderPass base ── */
      class ShaderPass {
        constructor(props) { this.props = props || {}; this.uniforms = this.props.material?.uniforms; this.scene = null; this.camera = null; }
        init() {
          this.scene = new THREE.Scene();
          this.camera = new THREE.Camera();
          if (this.uniforms) {
            this.material = new THREE.RawShaderMaterial(this.props.material);
            this.geometry = new THREE.PlaneGeometry(2.0, 2.0);
            this.plane = new THREE.Mesh(this.geometry, this.material);
            this.scene.add(this.plane);
          }
        }
        update() {
          Common.renderer.setRenderTarget(this.props.output || null);
          Common.renderer.render(this.scene, this.camera);
          Common.renderer.setRenderTarget(null);
        }
      }

      /* ── Advection ── */
      class Advection extends ShaderPass {
        constructor(sp) {
          super({ material: { vertexShader: face_vert, fragmentShader: advection_frag, uniforms: { boundarySpace: { value: sp.cellScale }, px: { value: sp.cellScale }, fboSize: { value: sp.fboSize }, velocity: { value: sp.src.texture }, dt: { value: sp.dt }, isBFECC: { value: true } } }, output: sp.dst });
          this.uniforms = this.props.material.uniforms;
          this.init();
        }
        init() {
          super.init();
          const verts = new Float32Array([-1,-1,0,-1,1,0,-1,1,0,1,1,0,1,1,0,1,-1,0,1,-1,0,-1,-1,0]);
          const bg = new THREE.BufferGeometry();
          bg.setAttribute('position', new THREE.BufferAttribute(verts, 3));
          this.line = new THREE.LineSegments(bg, new THREE.RawShaderMaterial({ vertexShader: line_vert, fragmentShader: advection_frag, uniforms: this.uniforms }));
          this.scene.add(this.line);
        }
        update({ dt, isBounce, BFECC }) { this.uniforms.dt.value = dt; this.line.visible = isBounce; this.uniforms.isBFECC.value = BFECC; super.update(); }
      }

      /* ── ExternalForce ── */
      class ExternalForce extends ShaderPass {
        constructor(sp) {
          super({ output: sp.dst });
          super.init();
          this.mouse = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.RawShaderMaterial({
            vertexShader: mouse_vert, fragmentShader: externalForce_frag,
            blending: THREE.AdditiveBlending, depthWrite: false,
            uniforms: { px: { value: sp.cellScale }, force: { value: new THREE.Vector2(0, 0) }, center: { value: new THREE.Vector2(0, 0) }, scale: { value: new THREE.Vector2(sp.cursor_size, sp.cursor_size) } }
          }));
          this.scene.add(this.mouse);
        }
        update(p) {
          const u = this.mouse.material.uniforms;
          u.force.value.set((Mouse.diff.x / 2) * p.mouse_force, (Mouse.diff.y / 2) * p.mouse_force);
          const csx = p.cursor_size * p.cellScale.x, csy = p.cursor_size * p.cellScale.y;
          u.center.value.set(Math.min(Math.max(Mouse.coords.x, -1 + csx + p.cellScale.x * 2), 1 - csx - p.cellScale.x * 2), Math.min(Math.max(Mouse.coords.y, -1 + csy + p.cellScale.y * 2), 1 - csy - p.cellScale.y * 2));
          u.scale.value.set(p.cursor_size, p.cursor_size);
          super.update();
        }
      }

      /* ── Viscous ── */
      class Viscous extends ShaderPass {
        constructor(sp) {
          super({ material: { vertexShader: face_vert, fragmentShader: viscous_frag, uniforms: { boundarySpace: { value: sp.boundarySpace }, velocity: { value: sp.src.texture }, velocity_new: { value: sp.dst_.texture }, v: { value: sp.viscous }, px: { value: sp.cellScale }, dt: { value: sp.dt } } }, output: sp.dst, output0: sp.dst_, output1: sp.dst });
          this.init();
        }
        update({ viscous, iterations, dt }) {
          let fi, fo; this.uniforms.v.value = viscous;
          for (let i = 0; i < iterations; i++) {
            fi = i % 2 === 0 ? this.props.output0 : this.props.output1;
            fo = i % 2 === 0 ? this.props.output1 : this.props.output0;
            this.uniforms.velocity_new.value = fi.texture;
            this.props.output = fo; this.uniforms.dt.value = dt; super.update();
          }
          return fo;
        }
      }

      /* ── Divergence ── */
      class Divergence extends ShaderPass {
        constructor(sp) {
          super({ material: { vertexShader: face_vert, fragmentShader: divergence_frag, uniforms: { boundarySpace: { value: sp.boundarySpace }, velocity: { value: sp.src.texture }, px: { value: sp.cellScale }, dt: { value: sp.dt } } }, output: sp.dst });
          this.init();
        }
        update({ vel }) { this.uniforms.velocity.value = vel.texture; super.update(); }
      }

      /* ── Poisson ── */
      class Poisson extends ShaderPass {
        constructor(sp) {
          super({ material: { vertexShader: face_vert, fragmentShader: poisson_frag, uniforms: { boundarySpace: { value: sp.boundarySpace }, pressure: { value: sp.dst_.texture }, divergence: { value: sp.src.texture }, px: { value: sp.cellScale } } }, output: sp.dst, output0: sp.dst_, output1: sp.dst });
          this.init();
        }
        update({ iterations }) {
          let pi, po;
          for (let i = 0; i < iterations; i++) {
            pi = i % 2 === 0 ? this.props.output0 : this.props.output1;
            po = i % 2 === 0 ? this.props.output1 : this.props.output0;
            this.uniforms.pressure.value = pi.texture;
            this.props.output = po; super.update();
          }
          return po;
        }
      }

      /* ── Pressure ── */
      class Pressure extends ShaderPass {
        constructor(sp) {
          super({ material: { vertexShader: face_vert, fragmentShader: pressure_frag, uniforms: { boundarySpace: { value: sp.boundarySpace }, pressure: { value: sp.src_p.texture }, velocity: { value: sp.src_v.texture }, px: { value: sp.cellScale }, dt: { value: sp.dt } } }, output: sp.dst });
          this.init();
        }
        update({ vel, pressure }) { this.uniforms.velocity.value = vel.texture; this.uniforms.pressure.value = pressure.texture; super.update(); }
      }

      /* ── Simulation ── */
      class Simulation {
        constructor(opts) {
          this.options = {
            iterations_poisson: effectivePoisson,
            iterations_viscous: effectiveViscousIter,
            mouse_force: mouseForce,
            resolution: effectiveResolution,
            cursor_size: cursorSize,
            viscous,
            isBounce,
            dt,
            isViscous,
            BFECC: effectiveBFECC,
            ...opts,
          };
          this.fbos = {}; this.fboSize = new THREE.Vector2(); this.cellScale = new THREE.Vector2(); this.boundarySpace = new THREE.Vector2();
          this.init();
        }
        init() { this.calcSize(); this.createFBOs(); this.createPasses(); }
        getFloatType() { return /(iPad|iPhone|iPod)/i.test(navigator.userAgent) ? THREE.HalfFloatType : THREE.FloatType; }
        createFBOs() {
          const type = this.getFloatType();
          const o = { type, depthBuffer: false, stencilBuffer: false, minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, wrapS: THREE.ClampToEdgeWrapping, wrapT: THREE.ClampToEdgeWrapping };
          ['vel_0','vel_1','vel_viscous0','vel_viscous1','div','pressure_0','pressure_1'].forEach(k => { this.fbos[k] = new THREE.WebGLRenderTarget(this.fboSize.x, this.fboSize.y, o); });
        }
        createPasses() {
          this.advection = new Advection({ cellScale: this.cellScale, fboSize: this.fboSize, dt: this.options.dt, src: this.fbos.vel_0, dst: this.fbos.vel_1 });
          this.externalForce = new ExternalForce({ cellScale: this.cellScale, cursor_size: this.options.cursor_size, dst: this.fbos.vel_1 });
          this.viscousPass = new Viscous({ cellScale: this.cellScale, boundarySpace: this.boundarySpace, viscous: this.options.viscous, src: this.fbos.vel_1, dst: this.fbos.vel_viscous1, dst_: this.fbos.vel_viscous0, dt: this.options.dt });
          this.divergence = new Divergence({ cellScale: this.cellScale, boundarySpace: this.boundarySpace, src: this.fbos.vel_viscous0, dst: this.fbos.div, dt: this.options.dt });
          this.poisson = new Poisson({ cellScale: this.cellScale, boundarySpace: this.boundarySpace, src: this.fbos.div, dst: this.fbos.pressure_1, dst_: this.fbos.pressure_0 });
          this.pressure = new Pressure({ cellScale: this.cellScale, boundarySpace: this.boundarySpace, src_p: this.fbos.pressure_0, src_v: this.fbos.vel_viscous0, dst: this.fbos.vel_0, dt: this.options.dt });
        }
        calcSize() {
          const w = Math.max(1, Math.round(this.options.resolution * Common.width));
          const h = Math.max(1, Math.round(this.options.resolution * Common.height));
          this.cellScale.set(1 / w, 1 / h); this.fboSize.set(w, h);
        }
        resize() { this.calcSize(); for (let k in this.fbos) this.fbos[k].setSize(this.fboSize.x, this.fboSize.y); }
        update() {
          this.boundarySpace.copy(this.options.isBounce ? new THREE.Vector2(0, 0) : this.cellScale);
          this.advection.update({ dt: this.options.dt, isBounce: this.options.isBounce, BFECC: this.options.BFECC });
          this.externalForce.update({ cursor_size: this.options.cursor_size, mouse_force: this.options.mouse_force, cellScale: this.cellScale });
          let vel = this.fbos.vel_1;
          if (this.options.isViscous) vel = this.viscousPass.update({ viscous: this.options.viscous, iterations: this.options.iterations_viscous, dt: this.options.dt });
          this.divergence.update({ vel });
          const p = this.poisson.update({ iterations: this.options.iterations_poisson });
          this.pressure.update({ vel, pressure: p });
        }
      }

      /* ── Output ── */
      class Output {
        constructor() {
          this.simulation = new Simulation();
          this.scene = new THREE.Scene();
          this.camera = new THREE.Camera();
          this.output = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), new THREE.RawShaderMaterial({
            vertexShader: face_vert, fragmentShader: color_frag, transparent: true, depthWrite: false,
            uniforms: { velocity: { value: this.simulation.fbos.vel_0.texture }, boundarySpace: { value: new THREE.Vector2() }, palette: { value: paletteTex }, bgColor: { value: bgVec4 } }
          }));
          this.scene.add(this.output);
        }
        resize() { this.simulation.resize(); }
        update() { this.simulation.update(); Common.renderer.setRenderTarget(null); Common.renderer.render(this.scene, this.camera); }
      }

      /* ── Manager ── */
      const container = mountRef.current;
      Common.init(container);
      Mouse.init(container);
      container.prepend(Common.renderer.domElement);

      const output = new Output();
      let lastUserInteraction = performance.now();
      Mouse.onInteract = () => { lastUserInteraction = performance.now(); if (autoDriverInst) autoDriverInst.forceStop(); };

      const autoDriverInst = new AutoDriver(Mouse, { lastUserInteraction }, {
        enabled: autoDemo, speed: autoSpeed, resumeDelay: autoResumeDelay, rampDuration: autoRampDuration
      });
      const managerRef = { lastUserInteraction };
      autoDriverInst.manager = managerRef;
      Mouse.onInteract = () => { managerRef.lastUserInteraction = performance.now(); autoDriverInst.forceStop(); };

      /* ── Frame-throttled render loop ── */
      let running = true;
      let lastFrameTime = 0;

      function loop(now) {
        if (!running) return;
        rafRef.current = requestAnimationFrame(loop);

        /* Skip frames to hit target FPS */
        const elapsed = now - lastFrameTime;
        if (elapsed < frameInterval) return;
        lastFrameTime = now - (elapsed % frameInterval);

        try {
          autoDriverInst.update();
          Mouse.update();
          Common.update();
          output.update();
        } catch (err) {
          console.error('[LiquidEther] render error, stopping:', err.message);
          running = false;
        }
      }

      const onResize = () => { Common.resize(); output.resize(); };
      window.addEventListener('resize', onResize);

      const onVis = () => {
        if (document.hidden) { running = false; if (rafRef.current) cancelAnimationFrame(rafRef.current); }
        else if (isVisibleRef.current) { running = true; requestAnimationFrame(loop); }
      };
      document.addEventListener('visibilitychange', onVis);

      /* IntersectionObserver */
      let io;
      try {
        io = new IntersectionObserver(entries => {
          const vis = entries[0].isIntersecting;
          isVisibleRef.current = vis;
          if (vis && !document.hidden) { if (!running) { running = true; requestAnimationFrame(loop); } }
          else { running = false; if (rafRef.current) cancelAnimationFrame(rafRef.current); }
        }, { threshold: [0, 0.01] });
        io.observe(container);
      } catch (e) { /* fallback: always visible */ }

      requestAnimationFrame(loop);
      webglRef.current = { Common, Mouse, output, autoDriverInst };

    }).catch(err => {
      console.error('[LiquidEther] init failed:', err);
    });

    return () => {
      disposed = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      const wgl = webglRef.current;
      if (wgl) {
        try { wgl.Mouse.dispose(); } catch (e) {}
        try {
          const canvas = wgl.Common.renderer?.domElement;
          if (canvas?.parentNode) canvas.parentNode.removeChild(canvas);
          wgl.Common.renderer?.dispose();
          wgl.Common.renderer?.forceContextLoss();
        } catch (e) {}
      }
      webglRef.current = null;
    };
  }, [tier, isPotato, colors, mouseForce, cursorSize, isViscous, viscous, iterationsViscous, iterationsPoisson, dt, BFECC, resolution, isBounce, autoDemo, autoSpeed, autoIntensity, takeoverDuration, autoResumeDelay, autoRampDuration]);

  /* Potato tier: lightweight CSS fallback */
  if (isPotato) return <FallbackBg aria-hidden="true" />;

  /* Waiting for tier detection */
  if (!tier) return null;

  /* Apply blur as a direct CSS filter on the canvas wrapper.
     This replaces the old backdrop-filter on <main> —
     same visual result, but no per-frame backdrop sampling.
     Extend the wrapper beyond the viewport by the blur radius
     so blur doesn't create dark edges from sampling empty space. */
  const etherBlur = preset?.etherBlur || 0;
  const wrapperStyle = etherBlur > 0
    ? {
        filter: `blur(${etherBlur}px)`,
        WebkitFilter: `blur(${etherBlur}px)`,
        inset: `-${etherBlur}px`,
      }
    : undefined;

  return <Wrapper ref={mountRef} aria-hidden="true" style={wrapperStyle} />;
}
