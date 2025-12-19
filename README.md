# 🥁 Drummer World

![App Preview](https://imgix.cosmicjs.com/535ec3a0-dd10-11f0-b433-93b748d9574f-photo-1519892300165-cb5542fb47c7-1766172262836.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern web platform celebrating legendary drummers, their discographies, and the art of percussion. Built with Next.js 16 and powered by Cosmic CMS.

## ✨ Features

- **Legendary Drummer Profiles** - Detailed biographical pages with photos, career information, and drumming styles
- **Discography Showcase** - Complete album collections with cover art, release years, and descriptions
- **Dynamic Blog** - Articles covering drumming techniques, gear reviews, and music history
- **Category Navigation** - Filter blog content by Technique, Gear Reviews, and History
- **Author Pages** - Meet the writers behind the content with dedicated author profiles
- **Responsive Design** - Seamless experience on all devices with mobile-first approach
- **Server-Side Rendering** - Lightning-fast page loads with Next.js App Router
- **Image Optimization** - High-quality imagery with imgix optimization

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=69459aba6ab8813880b2af07&clone_repository=6945a7506ab8813880b2af3e)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a website dedicated to drummers. Drummer World will include profile pages of various legendary drummers with pictures, information, and discography. It will also include a blog with authors and categories."

### Code Generation Prompt

> Based on the content model I created for "Create a website dedicated to drummers. Drummer World will include profile pages of various legendary drummers with pictures, information, and discography. It will also include a blog with authors and categories.", now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠️ Technologies Used

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Cosmic CMS** - Headless CMS for content management
- **React Markdown** - Markdown rendering for blog content
- **Imgix** - Image optimization and CDN

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account with the Drummer World bucket

### Installation

1. Clone this repository
2. Install dependencies:

```bash
bun install
```

3. Create a `.env.local` file in the root directory:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:

```bash
bun run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📚 Cosmic SDK Examples

### Fetching Drummers with Albums

```typescript
import { cosmic } from '@/lib/cosmic'

const { objects: drummers } = await cosmic.objects
  .find({ type: 'drummers' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Access drummer data
drummers.forEach(drummer => {
  console.log(drummer.metadata.full_name)
  console.log(drummer.metadata.biography)
})
```

### Fetching Blog Posts with Authors and Categories

```typescript
const { objects: posts } = await cosmic.objects
  .find({ type: 'blog-posts' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Access nested author and category data
posts.forEach(post => {
  console.log(post.metadata.author.title)
  console.log(post.metadata.categories.map(cat => cat.title))
})
```

## 🎨 Cosmic CMS Integration

This application uses Cosmic's powerful content modeling features:

- **Object Relationships** - Authors and categories are connected to blog posts
- **Album-Drummer Connections** - Albums link to their respective drummers
- **Rich Content** - HTML and Markdown fields for detailed biographies and articles
- **Media Management** - Optimized images using Cosmic's imgix integration
- **Depth Queries** - Efficient data fetching with nested object relationships

## 🌐 Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

1. Click the "Deploy with Vercel" button
2. Connect your GitHub repository
3. Add environment variables in Vercel dashboard:
   - `COSMIC_BUCKET_SLUG`
   - `COSMIC_READ_KEY`
   - `COSMIC_WRITE_KEY`
4. Deploy!

### Environment Variables

Make sure to set these environment variables in your deployment platform:

- `COSMIC_BUCKET_SLUG` - Your Cosmic bucket slug
- `COSMIC_READ_KEY` - Your Cosmic read API key
- `COSMIC_WRITE_KEY` - Your Cosmic write API key (if needed for future features)

<!-- README_END -->