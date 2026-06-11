import { cookies } from "next/headers";
import { apiFetch } from "../client";
import { ApiResult } from "../../types/apiResponse";

export async function getPrograms(): Promise<ApiResult<string[]>> {

    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    return apiFetch("/programs/get", {headers: { 'Accept': 'application/json', Cookie: cookieHeader }})

}