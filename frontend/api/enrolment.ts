import { Programs } from "../constants/global";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function enrolStudentInProgram(
    studentId: string,
    programNames: string[],
): Promise<string> {

    const res = await fetch(`${apiUrl}/enrolment/enrol-student`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({studentId, programNames})
    })

    if (!res.ok) {
        const message = await res.text();
        throw new Error(message);
    }

    return res.text();

}