import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-gray-100 border-t mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <div className="text-lg font-bold">
              <span className="text-gray-900">САМо</span>
              <span className="text-orange-500">ГУРу</span>
            </div>
            <span className="text-gray-500 text-sm">© 2025</span>
          </div>

          <div className="flex items-center space-x-6 text-sm text-gray-600">
            <Link href="/ff" className="hover:text-orange-600 transition-colors">
              Підтримка
            </Link>
            <Link href="/rules" className="hover:text-orange-600 transition-colors">
              Правила
            </Link>
            <span className="text-xs text-gray-400">розробив Маркович Олександр</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
