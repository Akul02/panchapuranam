"use client"

import React, { ReactNode, useEffect, useState } from "react"
import { UserRole } from "../constants/global";
import { getUserSession } from "../api/client/auth";

type UserContextType = [UserRole, React.Dispatch<React.SetStateAction<UserRole>>];

export const UserContext = React.createContext<UserContextType | undefined>(undefined);

export default function UserProvider({initialUserRole, children}: {initialUserRole: UserRole, children: ReactNode}) {

    const  [userRole, setUserRole] = useState(initialUserRole);

    // useEffect(() => {
    //     getUserSession()
    //         .then((sessionInfo) => {
    //             console.log("test");
    //             switch (sessionInfo.role) {
    //                 case UserRole.ADMIN:
    //                     setUserRole(UserRole.ADMIN);
    //                     break;
        
    //                 case UserRole.TEACHER:
    //                     setUserRole(UserRole.TEACHER);
    //                     break;
        
    //                 case UserRole.NO_USER:
    //                     setUserRole(UserRole.NO_USER);
    //                     break;

    //                 default:
    //                     throw new Error("unknown role value");
    //             }
    //         }) .catch((err) => {
    //             console.log(err instanceof Error ? err.message : "Something went wrong");
    //         })
    // }, []);

    return ( 
        <UserContext.Provider value={[userRole, setUserRole]}>
            {children}
        </UserContext.Provider>
    )
}