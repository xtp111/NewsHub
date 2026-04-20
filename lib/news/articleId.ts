// Member: Tianpeng Xu
// Utility functions for encoding and decoding article identifiers using Base64URL

// Generates a URL-safe unique ID for an article by encoding its URL using Base64URL
// This ensures the ID can be safely used in routes without special characters
export function generateArticleId(url: string): string {
  return Buffer.from(url).toString("base64url");
}

// Decodes a Base64URL-encoded article ID back to its original URL string
// Useful for retrieving the original article source from the ID
export function decodeArticleId(id: string): string {
  return Buffer.from(id, "base64url").toString("utf-8");
}
