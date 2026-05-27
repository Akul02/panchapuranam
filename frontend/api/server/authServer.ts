import { cookies } from "next/headers";
import { Session } from "../../types/session";
import { apiFetch } from "../client";

export async function getUserSessionServer (): Promise<Session> {
    
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    return apiFetch("/session", { headers: {Cookie: cookieHeader}});
}