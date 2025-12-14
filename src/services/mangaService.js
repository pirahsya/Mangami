import { jikanFetch } from "../api/jikan";

export function searchManga(query, page = 1) {
  return jikanFetch(`/manga?q=${encodeURIComponent(query)}&page=${page}`);
}

export function getMangaDetail(id) {
  return jikanFetch(`/manga/${id}/full`);
}

export function getTopManga(page = 1) {
  return jikanFetch(`/top/manga?page=${page}`);
}

export function getMangaRecommendations(id) {
  return jikanFetch(`/manga/${id}/recommendations`);
}
