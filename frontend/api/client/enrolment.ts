import { ApiResult, SuccessResponse } from "../../types/apiResponse";
import { apiFetch } from "../client";


export async function enrolStudentInProgram(
    studentId: string,
    programNames: string[],
): Promise<ApiResult<SuccessResponse>> {

    return apiFetch("/enrolment/enrol-student", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({studentId, programNames})
    })
}