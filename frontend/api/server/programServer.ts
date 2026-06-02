import { cookies } from "next/headers";
import { apiFetch } from "../client";

export async function getPrograms(): Promise<string[]> {

    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    return apiFetch("/programs/get", {headers: { 'Accept': 'application/json', Cookie: cookieHeader }})

}