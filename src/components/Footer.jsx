import { Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-white dark:bg-black text-gray-700 dark:text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-3">
              {["Help Center", "AirCover", "Anti-discrimination", "Disability support", "Cancellation options", "Report neighborhood concern"].map((item, i) => (
                <li key={i}>
                  <a href="#" className="text-sm text-gray-500 hover:underline dark:text-gray-400">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Hosting */}
          <div>
            <h3 className="font-semibold mb-4">Hosting</h3>
            <ul className="space-y-3">
              {["Airbnb your home", "AirCover for Hosts", "Hosting resources", "Community forum", "Hosting responsibly"].map((item, i) => (
                <li key={i}>
                  <a href="#" className="text-sm text-gray-500 hover:underline dark:text-gray-400">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Airbnb */}
          <div>
            <h3 className="font-semibold mb-4">Airbnb</h3>
            <ul className="space-y-3">
              {["Newsroom", "New features", "Careers", "Investors", "Gift cards"].map((item, i) => (
                <li key={i}>
                  <a href="#" className="text-sm text-gray-500 hover:underline dark:text-gray-400">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-semibold mb-4">Community</h3>
            <ul className="space-y-3">
              {["Airbnb.org: disaster relief", "Combating discrimination", "Diversity & Belonging", "Accessibility"].map((item, i) => (
                <li key={i}>
                  <a href="#" className="text-sm text-gray-500 hover:underline dark:text-gray-400">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
            <div className="text-sm">© 2023 Airbnb, Inc.</div>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-sm hover:underline">
                Privacy
              </a>
              <span className="text-sm">·</span>
              <a href="#" className="text-sm hover:underline">
                Terms
              </a>
              <span className="text-sm">·</span>
              <a href="#" className="text-sm hover:underline">
                Sitemap
              </a>
            </div>
          </div>

          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <button className="flex items-center text-sm font-medium">
              <Globe className="mr-2 h-4 w-4" />
              English (US)
            </button>
            <button className="text-sm font-medium">$ USD</button>
          </div>
        </div>
      </div>
    </footer>
  );
}