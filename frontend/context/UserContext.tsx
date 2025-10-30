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
                    const errMsg = await res.text();
                    throw new Error(errMsg);
                }

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
                        break;

                    default:
                        throw new Error("unknown role value");
                }
                
            })
            .catch((err) => console.log(err.message));

    }, []);

    return ( 
        <UserContext.Provider value={[userRole, setUserRole]}>
            {children}
        </UserContext.Provider>
    )
}