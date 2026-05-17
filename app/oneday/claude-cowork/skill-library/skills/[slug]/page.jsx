import { notFound } from 'next/navigation';
import { requireClaudeCoworkLibraryAccess } from '../../../../../../lib/claudeCoworkAuth';
import {
  CLAUDE_COWORK_SKILLS,
  getClaudeCoworkPackagesForSkill,
  getClaudeCoworkSkill,
} from '../../../../../../lib/claudeCoworkLibrary';
import SkillDetailPageClient from './SkillDetailPageClient';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Claude Cowork Skill',
  robots: 'noindex, nofollow',
};

export async function generateStaticParams() {
  return CLAUDE_COWORK_SKILLS.map((skill) => ({ slug: skill.id }));
}

export default async function ClaudeCoworkSkillPage({ params }) {
  await requireClaudeCoworkLibraryAccess();
  const { slug } = await params;
  const skill = getClaudeCoworkSkill(slug);

  if (!skill) {
    notFound();
  }

  return <SkillDetailPageClient skill={skill} packages={getClaudeCoworkPackagesForSkill(skill)} />;
}
