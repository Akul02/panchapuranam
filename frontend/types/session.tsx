import { UserRole } from "../constants/global"

export type Session = {
    role: UserRole;
    firstLogin: boolean;
}