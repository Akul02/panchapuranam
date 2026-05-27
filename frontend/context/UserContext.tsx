"use client"

import React, { ReactNode, useState } from "react"
import { UserRole } from "../constants/global";

type UserContextType = [UserRole, React.Dispatch<React.SetStateAction<UserRole>>];

export const UserContext = React.createContext<UserContextType | undefined>(undefined);

export default function UserProvider({initialUserRole, children}: {initialUserRole: UserRole, children: ReactNode}) {

    const  [userRole, setUserRole] = useState(initialUserRole);

    return ( 
        <UserContext.Provider value={[userRole, setUserRole]}>
            {children}
        </UserContext.Provider>
    )
}