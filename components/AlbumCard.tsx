import { Album } from '@/types'

interface AlbumCardProps {
  album: Album;
}

export default function AlbumCard({ album }: AlbumCardProps) {
  return (
    <div className="card">
      {album.metadata.cover_art && (
        <div className="relative h-64 overflow-hidden">
          <img
            src={`${album.metadata.cover_art.imgix_url}?w=800&h=800&fit=crop&auto=format,compress`}
            alt={album.metadata.album_title}
            width="400"
            height="400"
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-light">
          {album.metadata.album_title}
        </h3>
        {album.metadata.release_year && (
          <p className="text-accent text-sm mb-3">
            {album.metadata.release_year}
          </p>
        )}
        {album.metadata.description && (
          <p className="text-gray-400 text-sm line-clamp-3">
            {album.metadata.description}
          </p>
        )}
      </div>
    </div>
  )
}