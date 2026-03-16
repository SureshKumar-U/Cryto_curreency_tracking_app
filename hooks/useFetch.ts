import { useState, useEffect } from "react";

export function useFetch<T = unknown>(endpoint: string) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const apikey = process.env.NEXT_PUBLIC_CRYPTO_API_KEY

    if(!apikey) throw new Error("apikey is not available")

    const baseUrl = process.env.NEXT_PUBLIC_CRYPTO_BASE_URL
     if(!baseUrl) throw new Error("baseUrl is not available")

        const url = baseUrl + "/"+ endpoint
    const options = {method:'GET', header:{"x-cg-demo-api-key":apikey}}

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(url,options);
                if (!res.ok) throw new Error(`Fetch error: ${res.status}`);
                const json: T = await res.json();
                setData(json);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, loading, error };
}