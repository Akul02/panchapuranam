import { apiFetch } from "./client"

type RegisterTeacherData = {
  firstName: string
  lastName: string
  email: string
  password: string
}

export async function registerTeacher(data: RegisterTeacherData): Promise<string> {
  return apiFetch("/teacher/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include"
  })
}