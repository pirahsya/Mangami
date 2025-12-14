import { Link } from "react-router-dom";

export default function MangaCard({ manga }) {
  return (
    <Link to={`/manga/${manga.mal_id}`} className="block hover:opacity-80">
      <img
        src={manga.images.jpg.image_url}
        alt={manga.title}
        className="rounded aspect-[2/3] object-cover"
      />
      <p className="mt-1 text-sm font-medium line-clamp-2">{manga.title}</p>
    </Link>
  );
}
