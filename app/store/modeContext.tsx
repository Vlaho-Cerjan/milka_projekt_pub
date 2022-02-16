// site mode store
// setting the site to dark or light mode

import React, { createContext, useState, useEffect } from "react";

export const defaultMode = "light";
export const modes = ["light", "dark"];
export const ModeContext = createContext<{
  mode: string,
  setMode: React.Dispatch<React.SetStateAction<string>>
}>({
  mode: "",
  setMode: () => {}
});

export const ModeProvider: React.FC = ({ children }) => {
  const [mode, setMode] = useState('light');

  useEffect(() => {
    if (!window) {
      return;
    }

    const m = localStorage.getItem('mode') || mode;
    setMode(m);
  }, [mode]);

  const contextValue = {
    mode: mode,
    setMode: setMode
  };

  return (
    <ModeContext.Provider value={contextValue}>
      {children}
    </ModeContext.Provider>
  );
};
