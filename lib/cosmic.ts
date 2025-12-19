import { createBucketClient } from '@cosmicjs/sdk'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
  apiEnvironment: 'staging'
})

// Simple error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Fetch all drummers
export async function getDrummers() {
  try {
    const response = await cosmic.objects
      .find({ type: 'drummers' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch drummers');
  }
}

// Fetch single drummer by slug
export async function getDrummer(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'drummers', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch drummer');
  }
}

// Fetch albums for a specific drummer
export async function getAlbumsByDrummer(drummerId: string) {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'albums',
        'metadata.drummer': drummerId 
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    // Manual sorting by release year (descending)
    return response.objects.sort((a: any, b: any) => {
      const yearA = a.metadata?.release_year || 0;
      const yearB = b.metadata?.release_year || 0;
      return yearB - yearA;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch albums');
  }
}

// Fetch all blog posts
export async function getBlogPosts() {
  try {
    const response = await cosmic.objects
      .find({ type: 'blog-posts' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    // Manual sorting by published date (newest first)
    return response.objects.sort((a: any, b: any) => {
      const dateA = new Date(a.metadata?.published_date || '').getTime();
      const dateB = new Date(b.metadata?.published_date || '').getTime();
      return dateB - dateA;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch blog posts');
  }
}

// Fetch single blog post by slug
export async function getBlogPost(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'blog-posts', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch blog post');
  }
}

// Fetch all categories
export async function getCategories() {
  try {
    const response = await cosmic.objects
      .find({ type: 'categories' })
      .props(['id', 'title', 'slug', 'metadata']);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch categories');
  }
}

// Fetch all authors
export async function getAuthors() {
  try {
    const response = await cosmic.objects
      .find({ type: 'authors' })
      .props(['id', 'title', 'slug', 'metadata']);
    
    return response.objects;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch authors');
  }
}

// Fetch author by slug
export async function getAuthor(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'authors', slug })
      .props(['id', 'title', 'slug', 'metadata']);
    
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch author');
  }
}

// Fetch posts by author
export async function getPostsByAuthor(authorId: string) {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'blog-posts',
        'metadata.author': authorId 
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    // Manual sorting by published date (newest first)
    return response.objects.sort((a: any, b: any) => {
      const dateA = new Date(a.metadata?.published_date || '').getTime();
      const dateB = new Date(b.metadata?.published_date || '').getTime();
      return dateB - dateA;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch posts by author');
  }
}

// Fetch category by slug
export async function getCategory(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'categories', slug })
      .props(['id', 'title', 'slug', 'metadata']);
    
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch category');
  }
}

// Fetch posts by category
export async function getPostsByCategory(categoryId: string) {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'blog-posts',
        'metadata.categories': categoryId 
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    // Manual sorting by published date (newest first)
    return response.objects.sort((a: any, b: any) => {
      const dateA = new Date(a.metadata?.published_date || '').getTime();
      const dateB = new Date(b.metadata?.published_date || '').getTime();
      return dateB - dateA;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch posts by category');
  }
}