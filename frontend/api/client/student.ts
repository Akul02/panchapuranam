import { SuccessResponse } from "../../types/apiResponse";
import { StudentRegisterData, StudentSearchResult } from "../../types/student";
import { apiFetch } from "../client";

export async function searchStudentDirectory(searchBarValue: string): Promise<StudentSearchResult[]> {
    return apiFetch(`/student/search?searchString=${searchBarValue}`, {method: "GET", credentials: "include"});
}

export async function registerStudent(studentData: StudentRegisterData): Promise<SuccessResponse> {
    return apiFetch("/student/register", {
        method: "post",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(studentData),
        credentials: "include"
    })
}

export async function bulkRegisterStudents(file : FormData): Promise<SuccessResponse> {
    return apiFetch("/student/bulk/register", {
        method: "POST",
        body: file,
        credentials: "include",
    })
}