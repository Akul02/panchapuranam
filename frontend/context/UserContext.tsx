"use client"

import React, { createContext, ReactNode, useEffect, useState } from "react"
import { UserRole } from "../constants/global";
import { session } from "../types/session";

type UserContextType = [UserRole, React.Dispatch<React.SetStateAction<UserRole>>];

export const UserContext = React.createContext<UserContextType | undefined>(undefined);

interface Props {
    children: ReactNode;
}

export default function UserProvider({children}: Props) {

    const  [userRole, setUserRole] = useState(UserRole.NO_USER);
    const apiUrl =  process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        fetch(`${apiUrl}/session`, {credentials: "include"})
            .then(async (res) => {
                if (!res.ok) {
                    setUserRole(UserRole.NO_USER);
                } else {

                    const sessionInfo: session = await res.json();

                    switch (sessionInfo.role) {
                        case UserRole.ADMIN:
                            setUserRole(UserRole.ADMIN);
                            break;
            
                        case UserRole.TEACHER:
                            setUserRole(UserRole.TEACHER);
                            break;
            
                        case UserRole.NO_USER:
                            setUserRole(UserRole.NO_USER);
                            // HANDLE THIS ERROR
                            // INCORRECT LOGIN
                            break;
                        default:
                            // HANDLE THIS ERRO
                            // INCORRECT ROLE VALUE
                            break;
                    }
                }
            })
            .catch((err) => console.log(err));

    }, []);

    return ( 
        <UserContext.Provider value={[userRole, setUserRole]}>
            {children}
        </UserContext.Provider>
    )
}