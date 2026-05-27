import { Session } from "../../types/session";
import { apiFetch } from "../client";

export async function login (emailString: string, passwordString: string): Promise<String> {
    return apiFetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            "email" : emailString,
            "password" : passwordString
        }),
        credentials: "include"
    })
}

export async function logout (): Promise<String> {
    return apiFetch("/logout", {
        method: 'POST',
        credentials: "include"
    })
}

export async function changePassword (passwordString: string): Promise<String> {
    return apiFetch("/password", {
        method: "POST",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify({
            "password" : passwordString
        }),
        credentials: "include"
    })
}

export async function getUserSession (): Promise<Session> {
    return apiFetch("/session", { credentials: "include"});
}