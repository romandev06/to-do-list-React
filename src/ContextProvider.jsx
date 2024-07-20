import React, { createContext, useEffect, useState } from 'react'

export const AppContext = createContext({})



export default function ContextProvider({ children }) {
    const [theme, setTheme] = useState('light')

    useEffect(() => {
        if (theme === 'dark') document.body.classList.add('dark')
        else { document.body.classList.remove('dark') }
    }, [theme])

    return (
        <AppContext.Provider value={{theme, setTheme}}>
            {children}
        </AppContext.Provider>
    )
}
