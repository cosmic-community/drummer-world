import { getPage } from '@/lib/cosmic'
import { Page } from '@/types'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import { Metadata } from 'next'

// Generate metadata for SEO
export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage('about') as Page | null
  
  if (!page) {
    return {
      title: 'About - Drummer World',
    }
  }
  
  return {
    title: `${page.metadata.page_title} - Drummer World`,
    description: page.metadata.meta_description,
  }
}

export default async function AboutPage() {
  const page = await getPage('about') as Page | null
  
  if (!page) {
    notFound()
  }

  return (
    <div className="bg-dark min-h-screen">
      {/* Hero Section with Featured Image */}
      {page.metadata.featured_image && (
        <section className="relative h-80 bg-secondary">
          <img
            src={`${page.metadata.featured_image.imgix_url}?w=1920&h=640&fit=crop&auto=format,compress`}
            alt={page.metadata.page_title}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white text-center drop-shadow-lg">
              {page.metadata.page_title}
            </h1>
          </div>
        </section>
      )}

      {/* Page Content */}
      <article className="py-16">
        <div className="container-custom max-w-4xl">
          {/* Page Header (if no featured image) */}
          {!page.metadata.featured_image && (
            <header className="mb-12 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
                {page.metadata.page_title}
              </h1>
            </header>
          )}

          {/* Markdown Content */}
          {page.metadata.content && (
            <div className="markdown-content">
              <ReactMarkdown>{page.metadata.content}</ReactMarkdown>
            </div>
          )}
        </div>
      </article>
    </div>
  )
}