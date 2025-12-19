// app/blog/[slug]/page.tsx
import { getBlogPost } from '@/lib/cosmic'
import { BlogPost } from '@/types'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getBlogPost(slug) as BlogPost | null
  
  if (!post) {
    notFound()
  }

  const publishedDate = post.metadata.published_date 
    ? new Date(post.metadata.published_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : null

  return (
    <div className="bg-dark min-h-screen">
      {/* Hero Section with Featured Image */}
      {post.metadata.featured_image && (
        <section className="relative h-96 bg-secondary">
          <img
            src={`${post.metadata.featured_image.imgix_url}?w=1920&h=600&fit=crop&auto=format,compress`}
            alt={post.metadata.title}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent" />
        </section>
      )}

      <article className="py-16">
        <div className="container-custom max-w-4xl">
          {/* Post Header */}
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
              {post.metadata.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-gray-400">
              {post.metadata.author && (
                <div className="flex items-center gap-3">
                  {post.metadata.author.metadata.photo && (
                    <img
                      src={`${post.metadata.author.metadata.photo.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                      alt={post.metadata.author.metadata.name}
                      width="40"
                      height="40"
                      className="rounded-full"
                    />
                  )}
                  <Link 
                    href={`/authors/${post.metadata.author.slug}`}
                    className="text-light hover:text-primary transition-colors"
                  >
                    {post.metadata.author.metadata.name}
                  </Link>
                </div>
              )}
              
              {publishedDate && (
                <time dateTime={post.metadata.published_date}>
                  {publishedDate}
                </time>
              )}
            </div>

            {post.metadata.categories && post.metadata.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-6">
                {post.metadata.categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/categories/${category.slug}`}
                    className="bg-secondary hover:bg-primary text-light px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    {category.metadata.name}
                  </Link>
                ))}
              </div>
            )}
          </header>

          {/* Post Content */}
          {post.metadata.content && (
            <div className="markdown-content">
              <ReactMarkdown>{post.metadata.content}</ReactMarkdown>
            </div>
          )}

          {/* Author Bio */}
          {post.metadata.author && post.metadata.author.metadata.bio && (
            <div className="mt-16 pt-8 border-t border-gray-700">
              <h3 className="text-2xl font-bold mb-4 text-primary">About the Author</h3>
              <div className="flex gap-6">
                {post.metadata.author.metadata.photo && (
                  <img
                    src={`${post.metadata.author.metadata.photo.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
                    alt={post.metadata.author.metadata.name}
                    width="100"
                    height="100"
                    className="rounded-full"
                  />
                )}
                <div>
                  <h4 className="text-xl font-semibold mb-2 text-light">
                    {post.metadata.author.metadata.name}
                  </h4>
                  <p className="text-gray-300">{post.metadata.author.metadata.bio}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </article>
    </div>
  )
}