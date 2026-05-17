'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import {
  CLAUDE_COWORK_COOKIE_NAME,
  CLAUDE_COWORK_LIBRARY_PATH,
  CLAUDE_COWORK_LOGIN_PATH,
  getClaudeCoworkPassword,
  getClaudeCoworkToken,
} from '../../../../lib/claudeCoworkAuth';

export async function loginClaudeCoworkLibrary(formData) {
  const password = String(formData.get('password') || '');

  if (password !== getClaudeCoworkPassword()) {
    redirect(`${CLAUDE_COWORK_LOGIN_PATH}?error=1`);
  }

  const cookieStore = await cookies();
  cookieStore.set(CLAUDE_COWORK_COOKIE_NAME, getClaudeCoworkToken(), {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 14,
    path: CLAUDE_COWORK_LIBRARY_PATH,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });

  redirect(CLAUDE_COWORK_LIBRARY_PATH);
}

export async function logoutClaudeCoworkLibrary() {
  const cookieStore = await cookies();
  cookieStore.set(CLAUDE_COWORK_COOKIE_NAME, '', {
    httpOnly: true,
    maxAge: 0,
    path: CLAUDE_COWORK_LIBRARY_PATH,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });
  redirect(CLAUDE_COWORK_LOGIN_PATH);
}
