export function formatImageUrl(rawUrl: string | undefined | null): string {
  if (!rawUrl) return "";
  let url = rawUrl.trim();
  if (!url.startsWith("/")) {
    url = "/" + url;
  }
  try {
    url = decodeURIComponent(url);
  } catch (e) {
    // Ignore decoding errors
  }
  url = url.normalize("NFC");
  return url
    .split("/")
    .map((seg) => (seg ? encodeURIComponent(seg) : ""))
    .join("/");
}
