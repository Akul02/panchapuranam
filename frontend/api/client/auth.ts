import { ApiResult, SuccessResponse } from "../../types/apiResponse";
import { Session } from "../../types/session";
import { apiFetch } from "../client";

export async function login (emailString: string, passwordString: string): Promise<ApiResult<SuccessResponse>> {
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

export async function logout (): Promise<ApiResult<SuccessResponse>> {
    return apiFetch("/logout", {
        method: 'POST',
        credentials: "include"
    })
}

export async function changePassword (passwordString: string): Promise<ApiResult<SuccessResponse>>{
    return apiFetch("/password", {
        method: "POST",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify({
            "password" : passwordString
        }),
        credentials: "include"
    })
}

export async function getUserSession ():  Promise<ApiResult<Session>> {
    return apiFetch("/session", { credentials: "include"});
}