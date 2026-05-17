import SkillLibraryPageClient from './SkillLibraryPageClient';
import { requireClaudeCoworkLibraryAccess } from '../../../../lib/claudeCoworkAuth';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Claude Cowork Skill Library',
  description: 'Passwortgeschützte Skill- und Skill-Paket-Bibliothek für OneDay Claude Cowork Teilnehmer.',
  robots: 'noindex, nofollow',
};

export default async function ClaudeCoworkSkillLibraryPage() {
  await requireClaudeCoworkLibraryAccess();
  return <SkillLibraryPageClient />;
}
