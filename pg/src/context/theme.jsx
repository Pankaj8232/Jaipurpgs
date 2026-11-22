import { createContext, useState, useEffect } from "react";

export const themecontext = createContext();

function Themeprovider({ children }) {
  const [theme, settheme] = useState(
    localStorage.getItem("theme") || "dark"
  );

  useEffect(() => {
    document.body.classList.remove("dark", "light");
    document.body.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <themecontext.Provider value={{ theme, settheme }}>
      {children}
    </themecontext.Provider>
  );
}

export { Themeprovider };