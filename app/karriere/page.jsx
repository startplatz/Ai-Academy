import KarrierePageClient from './KarrierePageClient';
import {
  formatJobDate,
  getJobs,
  jobExcerpt,
  jobLocationLabel,
} from '../../lib/personioJobs.mjs';
import { withSocial } from '../../lib/seo';

/* Stellen kommen live aus Personio — einmal pro Stunde neu geprüft. */
export const revalidate = 3600;

export const metadata = withSocial({
  title: 'Karriere & Jobs',
  description:
    'Karriere bei der STARTPLATZ AI Academy: Offene Rollen in KI-Bildung, Marketing, Operations, Sales und Academy-Aufbau.',
  alternates: { canonical: '/karriere' },
  openGraph: {
    title: 'Karriere & Jobs | STARTPLATZ AI Academy',
    description:
      'Werde Teil der STARTPLATZ AI Academy und gestalte praxisnahe KI-Bildung für Menschen, Teams und Unternehmen.',
    url: 'https://startplatz-ai-academy.de/karriere',
    images: [
      {
        url: 'https://res.cloudinary.com/startplatz/image/upload/v1776469608/ai-hub/website/AI-Academy-Website-Images/team-gruppenfoto.png',
        width: 1200,
        height: 630,
        alt: 'STARTPLATZ AI Academy Team',
      },
    ],
  },
});

export default async function KarrierePage() {
  const jobs = await getJobs();

  const openings = jobs.map((job) => ({
    slug: job.slug,
    title: job.title,
    department: job.department,
    employmentType: job.employmentType,
    schedule: job.schedule,
    location: jobLocationLabel(job),
    excerpt: jobExcerpt(job, 180),
    datePosted: formatJobDate(job),
  }));

  return <KarrierePageClient openings={openings} />;
}
