import { useState } from "react";
import { updateUserManga } from "../utils/storage";

export default function MyListItem({ manga, onDelete }) {
  const [local, setLocal] = useState(manga);

  const update = (field, value) => {
    const updated = {
      ...local,
      [field]: value,
      updatedAt: new Date().toISOString(),
    };
    setLocal(updated);
    updateUserManga(manga.mal_id, { [field]: value });
  };

  return (
    <div className="border rounded p-4 dark:border-zinc-800">
      <div className="flex gap-4">
        <img src={manga.image} alt={manga.title} className="w-24 rounded" />

        <div className="flex-1">
          <h3 className="font-semibold">{manga.title}</h3>

          {/* STATUS */}
          <select
            value={local.status}
            onChange={(e) => update("status", e.target.value)}
            className="mt-2 px-2 py-1 border rounded dark:bg-zinc-800"
          >
            <option value="reading">Reading</option>
            <option value="completed">Completed</option>
            <option value="on-hold">On Hold</option>
            <option value="dropped">Dropped</option>
            <option value="plan-to-read">Plan to Read</option>
          </select>

          {/* PROGRESS */}
          <div className="mt-2">
            <label className="text-sm mr-2">Progress:</label>
            <input
              type="number"
              value={local.progress}
              min="0"
              onChange={(e) => update("progress", Number(e.target.value))}
              className="w-20 px-2 py-1 border rounded dark:bg-zinc-800"
            />
          </div>

          {/* RATING */}
          <div className="mt-2">
            <label className="text-sm mr-2">Rating:</label>
            <input
              type="number"
              min="1"
              max="10"
              value={local.score || ""}
              onChange={(e) => update("score", Number(e.target.value))}
              className="w-20 px-2 py-1 border rounded dark:bg-zinc-800"
            />
          </div>

          {/* NOTES */}
          <textarea
            value={local.notes}
            onChange={(e) => update("notes", e.target.value)}
            placeholder="Personal notes..."
            className="w-full mt-2 px-2 py-1 border rounded dark:bg-zinc-800"
          />
        </div>

        <button onClick={onDelete} className="text-red-600 text-sm self-start">
          Delete
        </button>
      </div>
    </div>
  );
}
