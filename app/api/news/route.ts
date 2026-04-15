import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { Article } from "@/types";

// Mock news data - can be replaced with a real API
const mockNews: Article[] = [
  {
    id: "1",
    title: "Tech Innovation Drives New Economic Growth",
    summary: "Latest research shows AI and big data are reshaping traditional industry models...",
    content: "Full article content...",
    category: "Tech",
    author: "Tech Daily",
    publishedAt: "2024-01-15T08:00:00Z",
    imageUrl: "/images/tech.jpg",
  },
  {
    id: "2",
    title: "Global Climate Summit Reaches New Consensus",
    summary: "World leaders pledge to increase emission reduction efforts at the summit...",
    content: "Full article content...",
    category: "World",
    author: "Global Times",
    publishedAt: "2024-01-14T10:30:00Z",
    imageUrl: "/images/climate.jpg",
  },
  {
    id: "3",
    title: "Local Cultural Festival Attracts Thousands of Visitors",
    summary: "A week-long cultural festival showcases diverse folk performances and cuisine...",
    content: "Full article content...",
    category: "Culture",
    author: "Local News",
    publishedAt: "2024-01-13T14:00:00Z",
    imageUrl: "/images/culture.jpg",
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const q = searchParams.get("q");
  const id = searchParams.get("id");

  // Get single article
  if (id) {
    const article = mockNews.find((n) => n.id === id);
    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }
    return NextResponse.json({ article });
  }

  let articles = [...mockNews];

  // Filter by category
  if (category && category !== "all") {
    articles = articles.filter((n) => n.category === category);
  }

  // Search
  if (q) {
    const query = q.toLowerCase();
    articles = articles.filter(
      (n) =>
        n.title.toLowerCase().includes(query) ||
        n.summary.toLowerCase().includes(query)
    );
  }

  return NextResponse.json({ articles });
}
