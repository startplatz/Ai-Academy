import { notFound } from 'next/navigation';
import JobDetailPageClient from './JobDetailPageClient';
import {
  formatJobDate,
  getJob,
  getJobs,
  jobExcerpt,
  jobLocationLabel,
  jobPostingJsonLd,
} from '../../../lib/personioJobs.mjs';
import { withSocial } from '../../../lib/seo';

/* Stellen kommen live aus Personio — einmal pro Stunde neu geprüft.
   Geschlossene Stellen fallen damit automatisch auf 404 zurück, wie es
   Google für abgelaufene Job-Postings verlangt. */
export const revalidate = 3600;

export async function generateStaticParams() {
  const jobs = await getJobs();
  return jobs.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const job = await getJob(slug);

  if (!job) {
    return {
      title: 'Stelle nicht gefunden',
      robots: { index: false, follow: true },
      alternates: { canonical: `/karriere/${slug}` },
    };
  }

  const description = jobExcerpt(job, 155);

  return withSocial({
    title: job.title,
    description,
    alternates: { canonical: `/karriere/${job.slug}` },
    openGraph: {
      title: `${job.title} | STARTPLATZ AI Academy`,
      description,
      url: `https://startplatz-ai-academy.de/karriere/${job.slug}`,
      type: 'article',
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
}

export default async function JobDetailPage({ params }) {
  const { slug } = await params;
  const jobs = await getJobs();
  const job = jobs.find((entry) => entry.slug === slug);

  if (!job) {
    notFound();
  }

  const jsonLd = jobPostingJsonLd(job);

  const view = {
    title: job.title,
    slug: job.slug,
    applyUrl: job.applyUrl,
    department: job.department,
    employmentType: job.employmentType,
    schedule: job.schedule,
    seniority: job.seniority,
    location: jobLocationLabel(job),
    datePosted: formatJobDate(job),
    excerpt: jobExcerpt(job, 220),
    sections: job.sections,
  };

  const relatedJobs = jobs
    .filter((entry) => entry.slug !== job.slug)
    .slice(0, 3)
    .map((entry) => ({
      slug: entry.slug,
      title: entry.title,
      department: entry.department,
      location: jobLocationLabel(entry),
    }));

  return (
    <>
      {/* Google Jobs: JobPosting muss auf der Seite mit der Beschreibung stehen */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <JobDetailPageClient job={view} relatedJobs={relatedJobs} />
    </>
  );
}
