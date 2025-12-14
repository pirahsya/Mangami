import { useEffect, useState } from "react";
import { getUserList, removeFromUserList } from "../utils/storage";
import MyListItem from "../components/MyListItem";
import ConfirmModal from "../components/ConfirmModal";

export default function MyList() {
  const [list, setList] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    setList(getUserList());
  }, []);

  const confirmDelete = () => {
    removeFromUserList(selected);
    setList(getUserList());
    setSelected(null);
  };

  if (list.length === 0) {
    return <p>Your list is empty.</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">My Manga List</h1>

      <div className="space-y-4">
        {list.map((manga) => (
          <MyListItem
            key={manga.mal_id}
            manga={manga}
            onDelete={() => setSelected(manga.mal_id)}
          />
        ))}
      </div>

      <ConfirmModal
        open={selected !== null}
        title="Remove Manga"
        message="Are you sure you want to remove this manga from your list?"
        onCancel={() => setSelected(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
