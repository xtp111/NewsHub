import { NextResponse } from "next/server";

export function ok<T>(data: T, status = 200) {
  return NextResponse.json(data, { status });
}

export function fail(status: number, error: string, message?: string) {
  return NextResponse.json({ error, message }, { status });
}

type RouteHandler = (
  req: Request,
  ctx: { params: Promise<Record<string, string>> }
) => Promise<NextResponse>;

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
