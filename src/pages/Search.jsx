import { useEffect, useState } from "react";
import { searchManga } from "../services/mangaService";
import { useDebounce } from "../hooks/useDebounce";
import MangaCard from "../components/MangaCard";

export default function Search() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);

  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!debouncedQuery) {
      setResults([]);
      setPage(1);
      return;
    }

    setLoading(true);
    setError(null);

    searchManga(debouncedQuery, page)
      .then((data) => {
        setResults((prev) => (page === 1 ? data : [...prev, ...data]));
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [debouncedQuery, page]);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Search Manga</h1>

      <input
        type="text"
        placeholder="Search manga title..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setPage(1);
        }}
        className="w-full mb-6 px-4 py-2 rounded border dark:bg-zinc-800 dark:border-zinc-700"
      />

      {/* STATES */}
      {error && <p className="text-red-500">{error}</p>}
      {loading && page === 1 && <p>Loading...</p>}
      {!loading && debouncedQuery && results.length === 0 && (
        <p>No results found.</p>
      )}

      {/* RESULT GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {results.map((manga) => (
          <MangaCard key={manga.mal_id} manga={manga} />
        ))}
      </div>

      {/* LOAD MORE */}
      {results.length > 0 && !loading && (
        <div className="mt-6 text-center">
          <button
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 rounded bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
          >
            Load more
          </button>
        </div>
      )}

      {loading && page > 1 && (
        <p className="text-center mt-4">Loading more...</p>
      )}
    </div>
  );
}
