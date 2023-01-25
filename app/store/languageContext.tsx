// language store
// setting the chosen language of the site

import React, { createContext, useState, useEffect, ReactNode } from "react";

export const defaultLocale = "en";
export const locales = ["en", "es"];
export const LanguageContext = createContext<{
  locale: string,
  setLocale: React.Dispatch<React.SetStateAction<string>>
}>({
  locale: "",
  setLocale: () => {}
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocale] = useState('en');

  useEffect(() => {
    if (!window) {
      return;
    }

    const language = localStorage.getItem('lang') || locale;
    setLocale(language);
  }, [locale]);

  const contextValue = {
    locale: locale,
    setLocale: setLocale
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};
