import { getDrummers } from '@/lib/cosmic'
import { Drummer } from '@/types'
import DrummerCard from '@/components/DrummerCard'

export const metadata = {
  title: 'Legendary Drummers - Drummer World',
  description: 'Explore profiles of legendary drummers who have shaped the sound of modern music.',
}

export default async function DrummersPage() {
  const drummers = await getDrummers() as Drummer[]

  return (
    <div className="py-16 bg-dark min-h-screen">
      <div className="container-custom">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
            Legendary Drummers
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover the drummers who have revolutionized music with their unique styles, 
            powerful techniques, and unforgettable performances.
          </p>
        </div>

        {drummers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-400">No drummers found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {drummers.map((drummer) => (
              <DrummerCard key={drummer.id} drummer={drummer} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}