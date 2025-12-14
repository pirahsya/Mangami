import { Link } from "react-router-dom";
import { BookOpen, Search, List } from "lucide-react";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
      <nav className="border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-6">
          <Link to="/" className="text-xl font-bold flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Mangami
          </Link>

          <div className="flex gap-4 text-sm">
            <Link
              to="/search"
              className="hover:underline flex gap-1 items-center"
            >
              <Search className="w-4 h-4" />
              Search
            </Link>
            <Link
              to="/my-list"
              className="hover:underline flex gap-1 items-center"
            >
              <List className="w-4 h-4" />
              My List
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-6">{children}</main>
    </div>
  );
}
