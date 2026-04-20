// Member: Tianpeng Xu
// Utility helpers for standardizing API responses and handling errors in route handlers

import { NextResponse } from "next/server";

// Sends a successful JSON response with optional HTTP status (default: 200)
export function ok<T>(data: T, status = 200) {
  return NextResponse.json(data, { status });
}

// Sends a standardized error response with status code, error type, and optional message
export function fail(status: number, error: string, message?: string) {
  return NextResponse.json({ error, message }, { status });
}

// Type definition for Next.js route handlers with async params support
type RouteHandler = (
  req: Request,
  ctx: { params: Promise<Record<string, string>> }
) => Promise<NextResponse>;

// Higher-order function that wraps a route handler with centralized error handling
// Catches exceptions, logs them, and returns a standardized 500 error response
export function withErrorHandler(handler: RouteHandler): RouteHandler {
  return async (req, ctx) => {
    try {
      return await handler(req, ctx);
    } catch (err) {
      console.error(err);
      return fail(500, "Internal server error", (err as Error).message);
    }
  };
}
