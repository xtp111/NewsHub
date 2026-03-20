import Link from "next/link";

export default function AboutPage() {
    return (
        <div className="p-8">
            <h1>This is the second page</h1>
            <p>This is a demonstration of how to safely hide an API key in a Next.js app.</p>
            <Link href="/" className="text-blue-500 underline">Go back home</Link>
        </div>
);
}