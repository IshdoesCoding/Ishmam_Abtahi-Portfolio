import React, { createContext, useContext, useEffect, useState} from 'react';

// creating the backgorund color switch

const ThemeContext = createContext();


export const useTheme = () => useContext(ThemeContext)

export const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState(
        () => localStorage.getItem('theme') || 'light'
    )


    useEffect(() => {
      document.body.setAttribute('data-theme', theme)
      localStorage.setItem('theme', theme)
    }, [theme])


    // eslint-disable-next-line no-undef
    const toggleTheme = () => {
        console.log('hello')
        setTheme((prevTheme) => (prevTheme === "light" ? "dark":'light'))
    
    }
    return (
        // eslint-disable-next-line no-undef
        <ThemeContext.Provider value = {{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}