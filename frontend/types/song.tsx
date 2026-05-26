import { Audio } from "./audio";

export type Song = {
    songId: number;
    title: string;
    verse: string[];
    audios: Audio[];
};