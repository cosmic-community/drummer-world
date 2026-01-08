// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Drummer interface
export interface Drummer extends CosmicObject {
  type: 'drummers';
  metadata: {
    full_name: string;
    biography?: string;
    birth_date?: string;
    photo?: {
      url: string;
      imgix_url: string;
    };
    drumming_style?: string;
    notable_bands?: string;
  };
}

// Album interface
export interface Album extends CosmicObject {
  type: 'albums';
  metadata: {
    album_title: string;
    drummer?: Drummer;
    release_year?: number;
    cover_art?: {
      url: string;
      imgix_url: string;
    };
    description?: string;
  };
}

// Author interface
export interface Author extends CosmicObject {
  type: 'authors';
  metadata: {
    name: string;
    bio?: string;
    photo?: {
      url: string;
      imgix_url: string;
    };
  };
}

// Category interface
export interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    name: string;
    description?: string;
  };
}

// Blog Post interface
export interface BlogPost extends CosmicObject {
  type: 'blog-posts';
  metadata: {
    title: string;
    content?: string;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    author?: Author;
    categories?: Category[];
    published_date?: string;
  };
}

// Changed: Added Page interface for CMS pages
export interface Page extends CosmicObject {
  type: 'pages';
  metadata: {
    page_title: string;
    content?: string;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    meta_description?: string;
    show_in_navigation?: boolean;
  };
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit?: number;
  skip?: number;
}

// Type guards
export function isDrummer(obj: CosmicObject): obj is Drummer {
  return obj.type === 'drummers';
}

export function isAlbum(obj: CosmicObject): obj is Album {
  return obj.type === 'albums';
}

export function isBlogPost(obj: CosmicObject): obj is BlogPost {
  return obj.type === 'blog-posts';
}

export function isAuthor(obj: CosmicObject): obj is Author {
  return obj.type === 'authors';
}

export function isCategory(obj: CosmicObject): obj is Category {
  return obj.type === 'categories';
}

// Changed: Added type guard for Page
export function isPage(obj: CosmicObject): obj is Page {
  return obj.type === 'pages';
}