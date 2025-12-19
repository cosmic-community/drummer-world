'use client'

import Link from 'next/link'
import { Category } from '@/types'

interface CategoryFilterProps {
  categories: Category[];
}

export default function CategoryFilter({ categories }: CategoryFilterProps) {
  if (!categories || categories.length === 0) {
    return null
  }

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-4 text-light">Filter by Category</h2>
      <div className="flex flex-wrap gap-3">
        <Link
          href="/blog"
          className="bg-secondary hover:bg-primary text-light px-6 py-3 rounded-lg font-medium transition-colors"
        >
          All Posts
        </Link>
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className="bg-secondary hover:bg-primary text-light px-6 py-3 rounded-lg font-medium transition-colors"
          >
            {category.metadata.name}
          </Link>
        ))}
      </div>
    </div>
  )
}