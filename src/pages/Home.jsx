import { getTopManga } from "../services/mangaService";
import { useAsync } from "../hooks/useAsync";

export default function Home() {
  const { data, loading, error } = useAsync(() => getTopManga(), []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Top Manga</h2>
      <ul className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {data.map((manga) => (
          <li key={manga.mal_id}>
            <img
              src={manga.images.jpg.image_url}
              alt={manga.title}
              className="rounded"
            />
            <p className="mt-1 text-sm">{manga.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
