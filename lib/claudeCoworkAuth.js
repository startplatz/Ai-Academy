import { createHash } from 'node:crypto';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const CLAUDE_COWORK_COOKIE_NAME = 'claude_cowork_library';
export const CLAUDE_COWORK_LOGIN_PATH = '/oneday/claude-cowork/skill-library/login';
export const CLAUDE_COWORK_LIBRARY_PATH = '/oneday/claude-cowork/skill-library';
export const CLAUDE_COWORK_DEFAULT_PASSWORD = 'START100';

export function getClaudeCoworkPassword() {
  return process.env.CLAUDE_COWORK_LIBRARY_PASSWORD || CLAUDE_COWORK_DEFAULT_PASSWORD;
}

export function getClaudeCoworkToken() {
  const password = getClaudeCoworkPassword();
  const secret = process.env.CLAUDE_COWORK_LIBRARY_SECRET || password;
  return createHash('sha256').update(`${password}:${secret}`).digest('hex');
}

export async function hasClaudeCoworkLibraryAccess() {
  const cookieStore = await cookies();
  return cookieStore.get(CLAUDE_COWORK_COOKIE_NAME)?.value === getClaudeCoworkToken();
}

export async function requireClaudeCoworkLibraryAccess() {
  if (!(await hasClaudeCoworkLibraryAccess())) {
    redirect(CLAUDE_COWORK_LOGIN_PATH);
  }
}
