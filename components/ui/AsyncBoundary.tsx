// Member: Yuchen Bao
// AsyncBoundary: handle fallback when loading

"use client";

interface AsyncBoundaryProps {
  loading: boolean;
  error: string | null;
  children: React.ReactNode;
  loadingFallback?: React.ReactNode;
}

export default function AsyncBoundary({
  loading,
  error,
  children,
  loadingFallback = <div style={{ textAlign: "center", padding: "2rem" }}>Loading...</div>,
}: AsyncBoundaryProps) {
  if (loading) return <>{loadingFallback}</>;
  if (error) return <div style={{ textAlign: "center", padding: "2rem", color: "var(--color-danger-alt)" }}>Error: {error}</div>;
  return <>{children}</>;
}
