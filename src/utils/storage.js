const KEY = "mangami-user-list";
import toast from "react-hot-toast";

export function getUserList() {
  return JSON.parse(localStorage.getItem(KEY)) || [];
}

export function saveUserList(list) {
  localStorage.setItem(KEY, JSON.stringify(list));
}

export function isInUserList(mal_id) {
  return getUserList().some((m) => m.mal_id === mal_id);
}

export function addToUserList(manga) {
  const list = getUserList();
  list.push(manga);
  saveUserList(list);
  toast.success("Added to your list");
}

export function updateUserManga(mal_id, updates) {
  const list = getUserList().map((m) =>
    m.mal_id === mal_id ? { ...m, ...updates } : m
  );
  saveUserList(list);
  toast.success("Updated");
}

export function removeFromUserList(mal_id) {
  const list = getUserList().filter((m) => m.mal_id !== mal_id);
  saveUserList(list);
  toast.success("Removed from list");
}
