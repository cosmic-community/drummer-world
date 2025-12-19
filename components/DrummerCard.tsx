import Link from 'next/link'
import { Drummer } from '@/types'

interface DrummerCardProps {
  drummer: Drummer;
}

export default function DrummerCard({ drummer }: DrummerCardProps) {
  return (
    <Link href={`/drummers/${drummer.slug}`} className="card group">
      {drummer.metadata.photo && (
        <div className="relative h-64 overflow-hidden">
          <img
            src={`${drummer.metadata.photo.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
            alt={drummer.metadata.full_name}
            width="400"
            height="300"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2 text-primary group-hover:text-red-400 transition-colors">
          {drummer.metadata.full_name}
        </h3>
        {drummer.metadata.drumming_style && (
          <p className="text-accent text-sm mb-3">
            {drummer.metadata.drumming_style}
          </p>
        )}
        {drummer.metadata.notable_bands && (
          <p className="text-gray-400 text-sm line-clamp-2">
            {drummer.metadata.notable_bands}
          </p>
        )}
      </div>
    </Link>
  )
}