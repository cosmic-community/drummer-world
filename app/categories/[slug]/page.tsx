// app/categories/[slug]/page.tsx
import { getCategory, getPostsByCategory } from '@/lib/cosmic'
import { Category, BlogPost } from '@/types'
import { notFound } from 'next/navigation'
import BlogPostCard from '@/components/BlogPostCard'

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = await getCategory(slug) as Category | null
  
  if (!category) {
    notFound()
  }

  const posts = await getPostsByCategory(category.id) as BlogPost[]

  return (
    <div className="py-16 bg-dark min-h-screen">
      <div className="container-custom">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
            {category.metadata.name}
          </h1>
          {category.metadata.description && (
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {category.metadata.description}
            </p>
          )}
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-400">No posts found in this category.</p>
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