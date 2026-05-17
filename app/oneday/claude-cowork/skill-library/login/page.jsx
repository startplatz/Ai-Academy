import LoginPageClient from './LoginPageClient';

export const metadata = {
  title: 'Claude Cowork Skill Library Login',
  description: 'Passwortgeschützter Zugang zur Claude Cowork Skill Library für OneDay Workshop-Teilnehmer.',
  robots: 'noindex, nofollow',
};

export default async function ClaudeCoworkLibraryLoginPage({ searchParams }) {
  const params = await searchParams;
  return <LoginPageClient hasError={params?.error === '1'} />;
}
