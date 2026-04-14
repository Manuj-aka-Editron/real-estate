import { Metadata } from 'next';
import properties from '@/data/properties.json';
import PropertyClient from '@/components/properties/PropertyClient';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const property = properties.find(p => p.id === id);
  
  return {
    title: property ? `${property.name} | Aurelia Portfolio` : 'Property | Aurelia Estates',
    description: property?.description || 'A unique luxury property curated by Aurelia Estates.',
    openGraph: {
      images: [property?.image || ''],
    },
  };
}

export default async function PropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const property = properties.find(p => p.id === id);

  if (!property) {
    notFound();
  }

  return <PropertyClient id={id} />;
}
