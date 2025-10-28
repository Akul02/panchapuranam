import { Audio } from "./audio";

export type Song = {
    songId: number;
    title: string;
    language: string;
    verse: string[];
    audios: Audio[];
};