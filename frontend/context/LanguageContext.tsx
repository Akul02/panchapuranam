"use client"

import React, { ReactNode, useContext, useState } from 'react'

type LanguageContextType = [string, React.Dispatch<React.SetStateAction<string>>];

export const LanguageContext = React.createContext<LanguageContextType | undefined>(undefined);                         

interface Props {
    children: ReactNode;
}

export default function LanguageProvider({children}: Props) {

    const [language, setLanguage] = useState("tamil");

    return (
        <LanguageContext.Provider value={[language,setLanguage]}>
            {children}
        </LanguageContext.Provider>
    )
}