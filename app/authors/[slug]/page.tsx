// app/authors/[slug]/page.tsx
import { getAuthor, getPostsByAuthor } from '@/lib/cosmic'
import { Author, BlogPost } from '@/types'
import { notFound } from 'next/navigation'
import BlogPostCard from '@/components/BlogPostCard'

interface AuthorPageProps {
  params: Promise<{ slug: string }>;
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params
  const author = await getAuthor(slug) as Author | null
  
  if (!author) {
    notFound()
  }

  const posts = await getPostsByAuthor(author.id) as BlogPost[]

  return (
    <div className="py-16 bg-dark min-h-screen">
      <div className="container-custom">
        {/* Author Header */}
        <div className="mb-12 text-center max-w-3xl mx-auto">
          {author.metadata.photo && (
            <img
              src={`${author.metadata.photo.imgix_url}?w=400&h=400&fit=crop&auto=format,compress`}
              alt={author.metadata.name}
              width="200"
              height="200"
              className="rounded-full mx-auto mb-6 shadow-2xl"
            />
          )}
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
            {author.metadata.name}
          </h1>
          {author.metadata.bio && (
            <p className="text-xl text-gray-300">
              {author.metadata.bio}
            </p>
          )}
        </div>

        {/* Author's Posts */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-light mb-6">
            Articles by {author.metadata.name}
          </h2>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-400">No posts found by this author.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}