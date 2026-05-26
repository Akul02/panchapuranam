import { apiFetch } from "./client";

export async function login (emailString: string, passwordString: string) {
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

export async function logout () {
    return apiFetch("/logout", {
        method: 'POST',
        credentials: "include"
    })
}

export async function changePassword (passwordString: string) {
    return apiFetch("/password", {
        method: "POST",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify({
            "password" : passwordString
        }),
        credentials: "include"
    })
}