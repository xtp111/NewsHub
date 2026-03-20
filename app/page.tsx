"use client"; // 使用客户端组件处理交互
import { useState } from "react";
import { fetchData } from "./action";

export default function Home() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async (formData: FormData) => {
    const query = formData.get("query") as string;
    setError("");

    try {
      const result = await fetchData(query);
      setData(result);
    } catch (err) {
      setError("Failed to fetch data from API");
    }
  };

  return (
      <main className="p-8">
        <h1>My mp4 project</h1>

        <form action={handleSearch} className="my-4">
          <input name="query" className="border p-2 mr-2" placeholder="please input..." />
          <button type="submit" className="bg-blue-500 text-white p-2">search</button>
        </form>

        {/* 错误处理：要求 3 */}
        {error && <p className="text-red-500 font-bold">{error}</p>}

        {/* 数据展示：要求 2 */}
        {data && (
            <div className="mt-4 border p-4">
              <pre>{JSON.stringify(data, null, 2)}</pre>
            </div>
        )}
      </main>
  );
}
