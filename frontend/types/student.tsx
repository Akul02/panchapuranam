import { CertificateDto } from "./certficateDto";

export type StudentProfileEnrolmentDto = {
    id: number;
    enrolmentDate: string;
    programName: string;
}

export type StudentProfileDto = {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    certificates: CertificateDto[];
    enrolments: StudentProfileEnrolmentDto[];
}