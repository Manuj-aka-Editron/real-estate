import { Metadata } from 'next';
import neighborhoods from '@/data/neighborhoods.json';
import NeighborhoodClient from '@/components/neighborhoods/NeighborhoodClient';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const neighborhood = neighborhoods.find(n => n.slug === slug);
  
  return {
    title: neighborhood ? `${neighborhood.name}: A Narrative Guide | Aurelia` : 'Neighborhood | Aurelia Estates',
    description: neighborhood?.description || 'Explore curated narratives of New York finest districts.',
    openGraph: { images: [neighborhood?.image || ''] },
  };
}

export default async function NeighborhoodPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const neighborhood = neighborhoods.find(n => n.slug === slug);

  if (!neighborhood) {
    notFound();
  }

  return <NeighborhoodClient neighborhood={neighborhood as any} />;
}
