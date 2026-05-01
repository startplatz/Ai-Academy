import { NextResponse } from 'next/server';
import { REVIEW_RATINGS } from '../../../lib/reviewRatings';

const SOURCE_URL = 'https://www.provenexpert.com/de-de/startplatz/';

const cleanText = (value) =>
  value
    ?.replace(/&nbsp;|&#160;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();

const matchText = (html, regex) => cleanText(html.match(regex)?.[1]);

function parseRatings(html) {
  const totalPublished = matchText(html, /<div class="goldText"[^>]*>\s*(\d+)\s+Bewertungen/i);
  const totalSubmitted = matchText(html, /ratingsScenarioBInfo">von insgesamt<br>\s*(\d+)\s+Bewertungen/i);
  const provenExpertCount = matchText(html, /(\d+)\s+Bewertungen auf ProvenExpert\.com/i);
  const fiveStarCount = matchText(html, /5 Sterne \((\d+)\)/i);
  const fourStarCount = matchText(html, /4 Sterne \((\d+)\)/i);
  const threeStarCount = matchText(html, /3 Sterne \((\d+)\)/i);
  const twoStarCount = matchText(html, /2 Sterne \((\d+)\)/i);
  const oneStarCount = matchText(html, /1 Stern \((\d+)\)/i);
  const sourceDate = matchText(
    html,
    /id="refStarsStream"[\s\S]*?<div style="margin-top:10px;">([^<]+)<\/div>/i
  );

  const googleIndex = html.indexOf('data-testid="external-reviews-google"');
  const googleBlock =
    googleIndex >= 0
      ? html.slice(Math.max(0, googleIndex - 1600), googleIndex + 1600)
      : '';
  const googleScore = matchText(googleBlock, /<div class="goldText semibold">([\d,]+)\s+von 5/i);
  const googleCount = matchText(googleBlock, /(\d+)\s+Bewertungen auf <span class="semibold">Google<\/span>/i);
  const googleHref = cleanText(googleBlock.match(/href="([^"]*google\.com\/search[^"]+)"/i)?.[1])
    ?.replace(/&amp;/g, '&');
  const provenExpertScore = [
    [5, fiveStarCount],
    [4, fourStarCount],
    [3, threeStarCount],
    [2, twoStarCount],
    [1, oneStarCount],
  ].every(([, count]) => count !== undefined)
    ? (
        [
          [5, fiveStarCount],
          [4, fourStarCount],
          [3, threeStarCount],
          [2, twoStarCount],
          [1, oneStarCount],
        ].reduce((sum, [stars, count]) => sum + stars * Number(count), 0) /
        [
          fiveStarCount,
          fourStarCount,
          threeStarCount,
          twoStarCount,
          oneStarCount,
        ].reduce((sum, count) => sum + Number(count), 0)
      )
        .toFixed(2)
        .replace('.', ',')
    : undefined;

  return {
    ...REVIEW_RATINGS,
    live: true,
    checkedAt: sourceDate ? `Quelle aktualisiert: ${sourceDate}` : REVIEW_RATINGS.checkedAt,
    total: {
      ...REVIEW_RATINGS.total,
      value: totalPublished || REVIEW_RATINGS.total.value,
      detail: totalSubmitted
        ? `von ${totalSubmitted} eingegangenen Bewertungen`
        : REVIEW_RATINGS.total.detail,
    },
    platforms: REVIEW_RATINGS.platforms.map((platform) => {
      if (platform.id === 'google') {
        return {
          ...platform,
          value: googleScore || platform.value,
          detail: googleCount ? `${googleCount} Bewertungen auf Google` : platform.detail,
          href: googleHref || platform.href,
        };
      }

      if (platform.id === 'provenexpert') {
        return {
          ...platform,
          value: provenExpertScore || platform.value,
          detail: provenExpertCount
            ? `${provenExpertCount} Bewertungen auf ProvenExpert`
            : platform.detail,
        };
      }

      return platform;
    }),
  };
}

export async function GET() {
  try {
    const response = await fetch(SOURCE_URL, {
      headers: {
        'user-agent': 'STARTPLATZ AI Academy ratings fetcher',
      },
      next: { revalidate: 60 * 60 * 12 },
    });

    if (!response.ok) {
      throw new Error(`ProvenExpert returned ${response.status}`);
    }

    const html = await response.text();
    const ratings = parseRatings(html);

    return NextResponse.json(ratings, {
      headers: {
        'Cache-Control': 'public, max-age=0, s-maxage=43200, stale-while-revalidate=86400',
      },
    });
  } catch {
    return NextResponse.json(
      {
        ...REVIEW_RATINGS,
        live: false,
        checkedAt: `${REVIEW_RATINGS.checkedAt} · Fallback`,
      },
      {
        headers: {
          'Cache-Control': 'public, max-age=0, s-maxage=1800, stale-while-revalidate=3600',
        },
      }
    );
  }
}
