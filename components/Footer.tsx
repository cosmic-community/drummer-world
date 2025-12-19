import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-secondary py-12 mt-16">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-primary">Drummer World</h3>
            <p className="text-gray-400">
              Celebrating legendary drummers and the art of percussion. Explore profiles, discographies, and articles about drumming.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-primary">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/drummers" className="text-gray-400 hover:text-primary transition-colors">
                  Drummers
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Powered By */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-primary">Powered By</h3>
            <a 
              href="https://www.cosmicjs.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-primary transition-colors"
            >
              Cosmic CMS
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; {currentYear} Drummer World. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}