const KEY = "mangami-user-list";

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
}

export function updateUserManga(mal_id, updates) {
  const list = getUserList().map((m) =>
    m.mal_id === mal_id ? { ...m, ...updates } : m
  );
  saveUserList(list);
}
