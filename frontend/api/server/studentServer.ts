import { cookies } from "next/headers";
import { StudentProfileDto } from "../../types/student";
import { apiFetch } from "../client";
import { ApiResult } from "../../types/apiResponse";

export async function getStudentProfile(studentId: string): Promise<ApiResult<StudentProfileDto>> {

    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    return apiFetch(`/student/profile?uidString=${studentId}`, {
        headers: { "accept" : "application/json", Cookie: cookieHeader },
        method: "GET",
    })
}

export async function getStudentAvailablePrograms(studentId: string): Promise<ApiResult<string[]>> {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    return apiFetch(`/student/${studentId}/available-programs`, {
        headers: { "accept" : "application/json", Cookie: cookieHeader },
        method: "GET",
    })
}