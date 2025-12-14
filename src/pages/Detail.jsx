import { useParams } from "react-router-dom";
import {
  getMangaDetail,
  getMangaRecommendations,
} from "../services/mangaService";
import { useAsync } from "../hooks/useAsync";
import MangaCard from "../components/MangaCard";
import { addToUserList, isInUserList, updateUserManga } from "../utils/storage";

export default function Detail() {
  const { id } = useParams();

  const {
    data: manga,
    loading,
    error,
  } = useAsync(() => getMangaDetail(id), [id]);

  const { data: recommendations } = useAsync(
    () => getMangaRecommendations(id),
    [id]
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const alreadyAdded = isInUserList(manga.mal_id);

  const handleAdd = () => {
    addToUserList({
      mal_id: manga.mal_id,
      title: manga.title,
      image: manga.images.jpg.image_url,
      status: "plan-to-read",
      progress: 0,
      score: null,
      notes: "",
      updatedAt: new Date().toISOString(),
    });
  };

  const handleStatusChange = (e) => {
    updateUserManga(manga.mal_id, {
      status: e.target.value,
      updatedAt: new Date().toISOString(),
    });
  };

  return (
    <div>
      {/* HEADER */}
      <div className="flex gap-6 mb-8">
        <img
          src={manga.images.jpg.image_url}
          alt={manga.title}
          className="w-48 rounded"
        />

        <div>
          <h1 className="text-2xl font-bold">{manga.title}</h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            {manga.synopsis}
          </p>

          {!alreadyAdded ? (
            <button
              onClick={handleAdd}
              className="mt-4 px-4 py-2 rounded bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
            >
              Add to My List
            </button>
          ) : (
            <div className="mt-4">
              <label className="mr-2 text-sm">Status:</label>
              <select
                onChange={handleStatusChange}
                className="px-2 py-1 border rounded dark:bg-zinc-800"
              >
                <option value="reading">Reading</option>
                <option value="completed">Completed</option>
                <option value="on-hold">On Hold</option>
                <option value="dropped">Dropped</option>
                <option value="plan-to-read">Plan to Read</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* RECOMMENDATIONS */}
      {recommendations && recommendations.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Recommended Manga</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {recommendations.map((rec) => (
              <MangaCard key={rec.entry.mal_id} manga={rec.entry} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
