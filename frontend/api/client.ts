import { errorResponse } from "../types/apiResponse";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function apiFetch<T>(url: string, options?: RequestInit): Promise<T> {

    const res = await fetch(`${apiUrl}${url}`, options)

    if (!res.ok) {
        const errRes: errorResponse  = await res.json()
        throw new Error(errRes.message ?? `API error: ${res.status}`)
    }

    return res.json()
}