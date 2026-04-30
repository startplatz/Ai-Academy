/* ─────────────────────────────────────────────
   GPU Tier Detection & Adaptive Quality Presets
   Detects GPU capability and returns a quality
   tier used by LiquidEther and layout glass.
   ───────────────────────────────────────────── */

let cachedTier = null;

/**
 * Detect GPU tier: 'high' | 'medium' | 'low' | 'potato'
 * Result is cached after first call.
 */
export function getGpuTier() {
  if (cachedTier) return cachedTier;
  if (typeof window === 'undefined') return (cachedTier = 'high');

  const ua = navigator.userAgent || '';
  const isMobile = /Android|iPhone|iPad|iPod/i.test(ua);

  try {
    const canvas = document.createElement('canvas');
    const gl =
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl');
    if (!gl) return (cachedTier = 'potato');

    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    if (ext) {
      const renderer = gl
        .getParameter(ext.UNMASKED_RENDERER_WEBGL)
        .toLowerCase();

      /* Software renderers → potato */
      if (
        renderer.includes('swiftshader') ||
        renderer.includes('llvmpipe') ||
        renderer.includes('software')
      ) {
        return (cachedTier = 'potato');
      }

      /* Intel integrated */
      if (renderer.includes('intel')) {
        if (
          /uhd\s*(6[0-9]{2}|5[0-9]{2})/i.test(renderer) ||
          /hd\s*(graphics|[3-6][0-9]{2,3})/i.test(renderer) ||
          (/iris/i.test(renderer) && !/xe/i.test(renderer) && !/plus/i.test(renderer))
        ) {
          return (cachedTier = isMobile ? 'potato' : 'low');
        }
        return (cachedTier = 'medium');
      }

      /* Mobile GPUs */
      if (
        renderer.includes('adreno') ||
        renderer.includes('mali') ||
        renderer.includes('powervr')
      ) {
        const adrenoMatch = renderer.match(/adreno.*?(\d+)/);
        if (adrenoMatch) {
          const n = parseInt(adrenoMatch[1], 10);
          if (n < 600) return (cachedTier = 'potato');
          if (n < 700) return (cachedTier = 'low');
          return (cachedTier = 'medium');
        }
        return (cachedTier = isMobile ? 'low' : 'medium');
      }

      /* Apple GPU */
      if (renderer.includes('apple')) {
        return (cachedTier = isMobile ? 'medium' : 'high');
      }

      /* Discrete NVIDIA / AMD → high */
      if (
        renderer.includes('nvidia') ||
        renderer.includes('geforce') ||
        renderer.includes('radeon') ||
        renderer.includes('amd')
      ) {
        return (cachedTier = 'high');
      }
    }

    /* Fallback heuristics */
    if (navigator.deviceMemory && navigator.deviceMemory <= 4) {
      return (cachedTier = isMobile ? 'potato' : 'low');
    }
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) {
      return (cachedTier = 'low');
    }

    return (cachedTier = isMobile ? 'low' : 'medium');
  } catch (e) {
    return (cachedTier = isMobile ? 'low' : 'medium');
  }
}

/**
 * Quality presets per tier.
 *
 *   resolution   – simulation grid scale (0 = CSS fallback, no WebGL)
 *   fps          – target frames per second
 *   bfecc        – BFECC advection (3× texture reads)
 *   poisson      – Poisson pressure-solver iterations
 *   pixelRatio   – max device pixel ratio for canvas
 *   etherBlur    – CSS filter blur applied directly to LiquidEther canvas (px)
 *   mainOpacity  – rgba white overlay opacity on <main>
 *
 *   KEY CHANGE: We no longer use backdrop-filter on <main>.
 *   Instead, LiquidEther itself gets a CSS `filter: blur()`.
 *   This avoids the browser re-sampling + re-blurring the
 *   entire viewport every frame — the single biggest perf hit.
 */
export const GPU_PRESETS = {
  high: {
    resolution: 0.5,
    fps: 48,
    bfecc: true,
    poisson: 32,
    pixelRatio: 2,
    etherBlur: 18,
    mainOpacity: 0.68,
  },
  medium: {
    resolution: 0.35,
    fps: 30,
    bfecc: true,
    poisson: 18,
    pixelRatio: 1.5,
    etherBlur: 14,
    mainOpacity: 0.72,
  },
  low: {
    resolution: 0.2,
    fps: 24,
    bfecc: false,
    poisson: 8,
    pixelRatio: 1,
    etherBlur: 10,
    mainOpacity: 0.76,
  },
  potato: {
    resolution: 0,
    fps: 0,
    bfecc: false,
    poisson: 0,
    pixelRatio: 1,
    etherBlur: 0,
    mainOpacity: 0.85,
  },
};
