import { Song } from "../../types/song";
import { apiFetch } from "../client";

export async function getSongs(language: string): Promise<Song[]> {
    return apiFetch(`/song?languageString=${language}`, {method : "GET"});
}