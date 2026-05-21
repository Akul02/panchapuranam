
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function getPrograms(): Promise<string[]> {
    const res = await fetch(`${apiUrl}/programs/get`, {
        headers: { 'Accept': 'application/json' },
        credentials: 'include',
    });

    if (!res.ok) {
        const message = await res.text();
        throw new Error(message);
    }
    return res.json();
}