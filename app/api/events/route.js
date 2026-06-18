import { NextResponse } from 'next/server';
import { fetchStartplatzEvents } from '../../../lib/events/fetchStartplatzEvents';

/*
  GET /api/events
  Returns upcoming STARTPLATZ AI Hub / AI Academy events.

  Caching strategy:
  - Next.js Data Cache via fetchStartplatzEvents (next: { revalidate: 1800 })
  - Route-level revalidate as a belt-and-braces safeguard
*/

export const revalidate = 1800; // 30 minutes
export const dynamic = 'force-static';

export async function GET() {
  try {
    const events = await fetchStartplatzEvents({ limit: 40 });
    return NextResponse.json(
      { events, updated_at: new Date().toISOString(), source: 'html-scrape' },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600',
        },
      },
    );
  } catch (err) {
    // Never 500 – the client uses this as progressive enhancement.
    return NextResponse.json(
      {
        events: [],
        updated_at: new Date().toISOString(),
        source: 'error',
        error: err?.message || 'Unknown error',
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
        },
      },
    );
  }
}
