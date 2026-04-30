'use client';

import SharedLayout from '../components/SharedLayout';
import Hero from '../components/Hero';
import TargetAudience from '../components/TargetAudience';
import TeamSection from '../components/TeamSection';
import KPISection from '../components/KPISection';
import VisionSection from '../components/VisionSection';
import EventsTimeline from '../components/EventsTimeline';
import Testimonials from '../components/Testimonials';
import Stories from '../components/Stories';
import FAQ from '../components/FAQ';
import Newsletter from '../components/Newsletter';

export default function HomePage() {
  return (
    <SharedLayout showPreloader={true}>
      <Hero />
      <TargetAudience />
      <TeamSection />
      <KPISection />
      <VisionSection />
      <EventsTimeline />
      <Testimonials />
      <Stories />
      <FAQ />
      <Newsletter />
    </SharedLayout>
  );
}
