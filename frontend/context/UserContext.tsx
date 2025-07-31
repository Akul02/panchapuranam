"use client"

import React, { createContext, ReactNode, useState } from "react"
import { UserRole } from "../constants/global";

type UserContextType = [UserRole, React.Dispatch<React.SetStateAction<UserRole>>];

export const UserContext = React.createContext<UserContextType | undefined>(undefined);

interface Props {
    children: ReactNode;
}

export default function UserProvider({children}: Props) {

    const  [userRole, setUserRole] = useState(UserRole.NO_USER);

    return ( 
        <UserContext.Provider value={[userRole, setUserRole]}>
            {children}
        </UserContext.Provider>
    )
}