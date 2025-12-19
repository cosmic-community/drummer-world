import Link from 'next/link'
import { getDrummers, getBlogPosts } from '@/lib/cosmic'
import { Drummer, BlogPost } from '@/types'
import DrummerCard from '@/components/DrummerCard'
import BlogPostCard from '@/components/BlogPostCard'

export default async function Home() {
  const drummers = await getDrummers() as Drummer[]
  const posts = await getBlogPosts() as BlogPost[]
  
  const featuredDrummers = drummers.slice(0, 3)
  const featuredPosts = posts.slice(0, 3)

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-red-700 py-20">
        <div className="container-custom text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            Welcome to Drummer World
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 mb-8 max-w-3xl mx-auto">
            Celebrating legendary drummers, their iconic albums, and the art of percussion
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/drummers" className="btn-primary">
              Explore Drummers
            </Link>
            <Link href="/blog" className="btn-secondary">
              Read Blog
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Drummers */}
      <section className="py-16 bg-dark">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">
              Featured Drummers
            </h2>
            <Link href="/drummers" className="text-accent hover:text-yellow-500 font-medium">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredDrummers.map((drummer) => (
              <DrummerCard key={drummer.id} drummer={drummer} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Blog Posts */}
      <section className="py-16 bg-secondary">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">
              Latest Articles
            </h2>
            <Link href="/blog" className="text-accent hover:text-yellow-500 font-medium">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-dark">
        <div className="container-custom text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary">
            About Drummer World
          </h2>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            Drummer World is your ultimate destination for everything related to drumming and legendary percussionists. 
            We celebrate the artists who have shaped the sound of modern music, from jazz pioneers to rock icons.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed">
            Explore detailed profiles of iconic drummers, discover their discographies, and dive into articles covering 
            drumming techniques, gear reviews, and the rich history of percussion in music.
          </p>
        </div>
      </section>
    </div>
  )
}