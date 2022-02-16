import { ThemeProvider } from '@emotion/react'
import React, { useState } from 'react'
import lightThemeOptions from '../styles/theme/lightThemeOptions';
import darkThemeOptions from '../styles/theme/darkThemeOptions';
import { createTheme, Theme } from '@mui/material';

const light = createTheme(lightThemeOptions);
const dark = createTheme(darkThemeOptions);

const themes: { [x: string]: Theme } = {
    light: light,
    dark: dark,
}

const getTheme = (theme: string) => {
    return themes[theme];
}

// eslint-disable-next-line no-unused-vars
export const CustomThemeContext = React.createContext(
    {
        currentTheme: 'light',
        theme: light,
        setTheme: () => {},
        isDark: false,
    },
)

const CustomThemeProvider = (props: { children: any }) => {
    // eslint-disable-next-line react/prop-types
    const { children } = props

    // Read current theme from localStorage or maybe from an api
    const currentTheme = (typeof window !== "undefined")?localStorage.getItem('mode') || 'light': 'light';

    // State to hold the selected theme name
    const [themeName, _setThemeName] = useState(currentTheme)

    // Retrieve the theme object by theme name
    const theme = getTheme(themeName);

    const isDark = currentTheme === "dark";

    // Wrap _setThemeName to store new theme names in localStorage
    const setThemeName = () => {
        let tempTheme = "";
        if(currentTheme !== "light"){
            tempTheme = "light"
        }else{
            tempTheme = "dark"
        }
        if(typeof window !== "undefined") localStorage.setItem('mode', tempTheme)
        _setThemeName(tempTheme)
    }

    const contextValue = {
        currentTheme: themeName,
        theme: theme,
        setTheme: setThemeName,
        isDark: isDark,
    }

    return (
        <CustomThemeContext.Provider value={contextValue}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </CustomThemeContext.Provider>
    )
}

export default CustomThemeProvider