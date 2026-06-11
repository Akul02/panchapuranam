import { cookies } from "next/headers";
import { Session } from "../../types/session";
import { apiFetch } from "../client";
import { ApiResult } from "../../types/apiResponse";

export async function getUserSessionServer (): Promise<ApiResult<Session>> {
    
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    return apiFetch("/session", { headers: {Cookie: cookieHeader}});
}