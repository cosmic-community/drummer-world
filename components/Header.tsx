import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-secondary shadow-lg sticky top-0 z-50">
      <nav className="container-custom py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <span className="text-4xl">🥁</span>
            <span className="text-2xl font-bold text-primary group-hover:text-red-400 transition-colors">
              Drummer World
            </span>
          </Link>
          
          <div className="flex items-center gap-6">
            <Link 
              href="/drummers" 
              className="text-light hover:text-primary font-medium transition-colors"
            >
              Drummers
            </Link>
            <Link 
              href="/blog" 
              className="text-light hover:text-primary font-medium transition-colors"
            >
              Blog
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}