import { ApiResult } from "../../types/apiResponse";
import { CertificateDto } from "../../types/certficateDto";
import { CertificateCountDto } from "../../types/certificateCountDto";
import { apiFetch } from "../client";

export async function downloadCertificates(emailString: string): Promise<ApiResult<CertificateDto[]>> {
    return apiFetch(`/certificates?email=${emailString}`, { method: "GET" });
}

export async function certificatesCount(): Promise<ApiResult<CertificateCountDto>> {
    return apiFetch("/certificates/count", { method: "GET" });
}