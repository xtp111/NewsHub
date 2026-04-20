// Member: Tianpeng Xu
// Interfaces for article & bookmark data


// Represents a news article fetched from NewsAPI or stored in cache
export interface Article {
  id: string;           // Base64url-encoded article URL, used as a deterministic unique ID
  title: string;
  summary: string;      // Short description of the article
  content?: string;     // Full article content (can be truncated by NewsAPI)
  category: string;     // UI display category (e.g., "Tech", "World", "Finance")
  author: string;
  publishedAt: string;  // ISO 8601 date string
  imageUrl?: string;    // Thumbnail image URL from the news source
  sourceUrl: string;    // Original article URL for "Read full article" link
}

// Represents a bookmarked article stored in MongoDB
export interface BookmarkData {
  _id: string;          // MongoDB document ID
  articleId: string;    // References the Article.id (base64url-encoded URL)
  title: string;
  summary: string;
  imageUrl: string;
  category: string;
  author: string;
  publishedAt: string;
  createdAt: string;    // Timestamp when the bookmark was created
  sourceUrl?: string;   // Original article URL
}
