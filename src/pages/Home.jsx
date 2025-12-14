import { Link } from "react-router-dom";
import { getTopManga } from "../services/mangaService";
import { useAsync } from "../hooks/useAsync";
import MangaCard from "../components/MangaCard";

export default function Home() {
  const { data, loading, error } = useAsync(() => getTopManga(), []);

  if (loading) return <p>Loading recommendations...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <section className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Welcome to Mangami</h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Track, rate, and manage your personal manga list.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">🔥 Top Manga</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {data.slice(0, 12).map((manga) => (
            <MangaCard key={manga.mal_id} manga={manga} />
          ))}
        </div>

        <div className="mt-6 text-center">
          <Link to="/search" className="underline text-sm">
            Browse more manga →
          </Link>
        </div>
      </section>
    </div>
  );
}
