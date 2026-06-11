import { ApiResult, ErrorResponse } from "../types/apiResponse";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function apiFetch<T>(url: string, options?: RequestInit): Promise<ApiResult<T>> {

    const res = await fetch(`${apiUrl}${url}`, options)

    if (!res.ok) {
        const errRes: ErrorResponse  = await res.json();
        return {success: false, status: res.status, data: errRes}
    }

    return {success: true, data: await res.json()}
}