import { notFound } from 'next/navigation';
import { requireClaudeCoworkLibraryAccess } from '../../../../../../lib/claudeCoworkAuth';
import {
  CLAUDE_COWORK_PACKAGES,
  getClaudeCoworkPackage,
  getClaudeCoworkSkillsForPackage,
} from '../../../../../../lib/claudeCoworkLibrary';
import PluginDetailPageClient from './PluginDetailPageClient';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Claude Cowork Plugin',
  robots: 'noindex, nofollow',
};

export async function generateStaticParams() {
  return CLAUDE_COWORK_PACKAGES.map((pack) => ({ slug: pack.id }));
}

export default async function ClaudeCoworkPluginPage({ params }) {
  await requireClaudeCoworkLibraryAccess();
  const { slug } = await params;
  const pack = getClaudeCoworkPackage(slug);

  if (!pack) {
    notFound();
  }

  return <PluginDetailPageClient pack={pack} skills={getClaudeCoworkSkillsForPackage(pack.id)} />;
}
