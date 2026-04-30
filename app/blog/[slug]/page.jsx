import { permanentRedirect } from 'next/navigation';

export default async function BlogArticleRedirectPage({ params }) {
  const { slug } = await params;
  permanentRedirect(`/insights/${slug}`);
}
