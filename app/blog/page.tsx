import { getBlogPosts, getCategories } from '@/lib/cosmic'
import { BlogPost, Category } from '@/types'
import BlogPostCard from '@/components/BlogPostCard'
import CategoryFilter from '@/components/CategoryFilter'

export const metadata = {
  title: 'Blog - Drummer World',
  description: 'Read articles about drumming techniques, gear reviews, and the history of legendary drummers.',
}

export default async function BlogPage() {
  const posts = await getBlogPosts() as BlogPost[]
  const categories = await getCategories() as Category[]

  return (
    <div className="py-16 bg-dark min-h-screen">
      <div className="container-custom">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
            Drummer World Blog
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Dive into articles covering drumming techniques, gear reviews, and stories 
            about the legendary drummers who shaped music history.
          </p>
        </div>

        <CategoryFilter categories={categories} />

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-400">No blog posts found.</p>
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