// app/drummers/[slug]/page.tsx
import { getDrummer, getAlbumsByDrummer } from '@/lib/cosmic'
import { Drummer, Album } from '@/types'
import { notFound } from 'next/navigation'
import AlbumCard from '@/components/AlbumCard'

interface DrummerPageProps {
  params: Promise<{ slug: string }>;
}

export default async function DrummerPage({ params }: DrummerPageProps) {
  const { slug } = await params
  const drummer = await getDrummer(slug) as Drummer | null
  
  if (!drummer) {
    notFound()
  }

  const albums = await getAlbumsByDrummer(drummer.id) as Album[]

  return (
    <div className="bg-dark min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-secondary to-gray-900 py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {drummer.metadata.photo && (
              <div className="order-2 md:order-1">
                <img
                  src={`${drummer.metadata.photo.imgix_url}?w=800&h=800&fit=crop&auto=format,compress`}
                  alt={drummer.metadata.full_name}
                  width="400"
                  height="400"
                  className="rounded-lg shadow-2xl w-full"
                />
              </div>
            )}
            <div className="order-1 md:order-2">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
                {drummer.metadata.full_name}
              </h1>
              {drummer.metadata.drumming_style && (
                <p className="text-xl text-accent mb-4">
                  {drummer.metadata.drumming_style}
                </p>
              )}
              {drummer.metadata.birth_date && (
                <p className="text-gray-400 mb-4">
                  Born: {new Date(drummer.metadata.birth_date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              )}
              {drummer.metadata.notable_bands && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-light mb-2">Notable Bands:</h3>
                  <p className="text-gray-300">{drummer.metadata.notable_bands}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Biography Section */}
      {drummer.metadata.biography && (
        <section className="py-16 bg-dark">
          <div className="container-custom">
            <h2 className="text-3xl font-bold mb-6 text-primary">Biography</h2>
            <div 
              className="prose prose-invert prose-lg max-w-none text-gray-300"
              dangerouslySetInnerHTML={{ __html: drummer.metadata.biography }}
            />
          </div>
        </section>
      )}

      {/* Discography Section */}
      <section className="py-16 bg-secondary">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-8 text-primary">Discography</h2>
          {albums.length === 0 ? (
            <p className="text-gray-400 text-lg">No albums found for this drummer.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {albums.map((album) => (
                <AlbumCard key={album.id} album={album} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}