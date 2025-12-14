const BASE_URL = "https://api.jikan.moe/v4";

export async function jikanFetch(endpoint) {
  const res = await fetch(`${BASE_URL}${endpoint}`);

  if (!res.ok) {
    let message = "Something went wrong";

    if (res.status === 429) {
      message = "Too many requests. Please slow down.";
    } else if (res.status === 404) {
      message = "Data not found.";
    }

    throw new Error(message);
  }

  const json = await res.json();
  return json.data;
}
