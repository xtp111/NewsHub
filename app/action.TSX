"use server";

export async function fetchData(query: string) {
    const apiKey = process.env.API_KEY;

    // 这里的 fetch 是在服务器上执行的
    const response = await fetch(
        `https://api.harvardartmuseums.org/RESOURCE_TYPE?apikey=${apiKey}`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch data from API");
    }

    return response.json();
}