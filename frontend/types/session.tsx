import { UserRole } from "../constants/global"

export type session = {
    role: UserRole,
    firstLogin: boolean
}