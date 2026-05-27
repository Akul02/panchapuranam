import { apiFetch } from "../client";

export async function getPrograms(): Promise<string[]> {

    return apiFetch("/programs/get", {headers: { 'Accept': 'application/json' }, credentials: 'include'})

}