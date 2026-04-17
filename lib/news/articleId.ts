export function generateArticleId(url: string): string {
  return Buffer.from(url).toString("base64url");
}

export function decodeArticleId(id: string): string {
  return Buffer.from(id, "base64url").toString("utf-8");
}
