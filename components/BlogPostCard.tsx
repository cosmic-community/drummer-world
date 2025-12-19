import Link from 'next/link'
import { BlogPost } from '@/types'

interface BlogPostCardProps {
  post: BlogPost;
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  const publishedDate = post.metadata.published_date 
    ? new Date(post.metadata.published_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : null

  return (
    <Link href={`/blog/${post.slug}`} className="card group">
      {post.metadata.featured_image && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={`${post.metadata.featured_image.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
            alt={post.metadata.title}
            width="400"
            height="300"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-3 text-light group-hover:text-primary transition-colors line-clamp-2">
          {post.metadata.title}
        </h3>
        
        {post.metadata.categories && post.metadata.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {post.metadata.categories.map((category) => (
              <span 
                key={category.id}
                className="bg-dark text-accent px-2 py-1 rounded text-xs font-medium"
              >
                {category.metadata.name}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center gap-4 text-sm text-gray-400">
          {post.metadata.author && (
            <span>{post.metadata.author.metadata.name}</span>
          )}
          {publishedDate && (
            <span>{publishedDate}</span>
          )}
        </div>
      </div>
    </Link>
  )
}