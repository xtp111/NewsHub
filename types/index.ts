export interface Article {
  id: string;
  title: string;
  summary: string;
  content?: string;
  category: string;
  author: string;
  publishedAt: string;
  imageUrl?: string;
}

export interface BookmarkData {
  _id: string;
  articleId: string;
  title: string;
  summary: string;
  imageUrl: string;
  category: string;
  author: string;
  publishedAt: string;
  createdAt: string;
}
