import { useParams } from "react-router-dom";

export default function Detail() {
  const { id } = useParams();
  return <h1 className="text-2xl font-semibold">Manga Detail #{id}</h1>;
}
