import { ApiResult } from "../../types/apiResponse";
import { Song } from "../../types/song";
import { apiFetch } from "../client";

export async function getSongs(language: string): Promise<ApiResult<Song[]>> {
    return apiFetch(`/song?languageString=${language}`, {method : "GET"});
}