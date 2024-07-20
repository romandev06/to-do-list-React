import React, { useContext, useEffect } from 'react'
import { AppContext } from './ContextProvider'

export default function ChangeTheme() {
    const { theme, setTheme } = useContext(AppContext)

    const getKeyStorage = () => {
        setTheme(localStorage.getItem('defaultCurrentTheme'))
    }

    useEffect(() => getKeyStorage(), [theme])

    const createKeyStorage = (currentTheme) => {
        setTheme(localStorage.setItem('defaultCurrentTheme', currentTheme))
    }


    const onClickChangeTheme = () => {
        const currentTheme = theme === 'dark' ? 'light' : 'dark'
        createKeyStorage(currentTheme)
    }

    return (
        <button onClick={onClickChangeTheme} className='change-theme'>Change Theme</button>
    )
}
