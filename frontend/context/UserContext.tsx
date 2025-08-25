"use client"

import React, { createContext, ReactNode, useEffect, useState } from "react"
import { UserRole } from "../constants/global";

type UserContextType = [UserRole, React.Dispatch<React.SetStateAction<UserRole>>];

export const UserContext = React.createContext<UserContextType | undefined>(undefined);

interface Props {
    children: ReactNode;
}

export default function UserProvider({children}: Props) {

    const  [userRole, setUserRole] = useState(UserRole.NO_USER);
    const apiUrl =  process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        fetch(`${apiUrl}/role`, {credentials: "include"})
            .then(async (res) => {
                console.log("is fetching user")
                if (!res.ok) {
                    console.log("failed to fetch user")
                    setUserRole(UserRole.NO_USER);
                } else {
                    console.log("1")
                    const role = await res.text();
                    console.log(role);
                    switch (role) {
                        case UserRole.ADMIN:
                            setUserRole(UserRole.ADMIN);
                            console.log("test branch logic")
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