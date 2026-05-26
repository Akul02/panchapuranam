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

export interface StudentSearchResult {
    id: string,
    name: string
}

export type StudentRegisterData = {
    firstName : string,
    lastName : string,
    email : string,
    programNames: string[],
}