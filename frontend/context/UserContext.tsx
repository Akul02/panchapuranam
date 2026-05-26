"use client"

import React, { ReactNode, useEffect, useState } from "react"
import { UserRole } from "../constants/global";
import { getUserSession } from "../api/auth";

type UserContextType = [UserRole, React.Dispatch<React.SetStateAction<UserRole>>];

export const UserContext = React.createContext<UserContextType | undefined>(undefined);

interface Props {
    children: ReactNode;
}

export default function UserProvider({children}: Props) {

    const  [userRole, setUserRole] = useState(UserRole.NO_USER);

    useEffect(() => {
        getUserSession()
            .then((sessionInfo) => {
                switch (sessionInfo.role) {
                    case UserRole.ADMIN:
                        setUserRole(UserRole.ADMIN);
                        break;
        
                    case UserRole.TEACHER:
                        setUserRole(UserRole.TEACHER);
                        break;
        
                    case UserRole.NO_USER:
                        setUserRole(UserRole.NO_USER);
                        break;

                    default:
                        throw new Error("unknown role value");
                }
            }) .catch((err) => {
                console.log(err instanceof Error ? err.message : "Something went wrong");
            })
    }, []);

    return ( 
        <UserContext.Provider value={[userRole, setUserRole]}>
            {children}
        </UserContext.Provider>
    )
}