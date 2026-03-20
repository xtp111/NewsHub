"use server";

export async function fetchData(query: string) {
    const apiKey = process.env.API_KEY;

    const response = await fetch(
        `https://api.harvardartmuseums.org/object?q=${encodeURIComponent(query)}&apikey=${apiKey}`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch data from API");
    }

    return response.json();
}