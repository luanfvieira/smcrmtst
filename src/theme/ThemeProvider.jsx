import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import { themeCreator } from "./base";
import { StylesProvider } from "@mui/styles";
// import { ptBR as ptBRTheme } from "@mui/material/locale";

import { LocalizationProvider, ptBR } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ptBR as ptBRAdapter } from "date-fns/locale";

export const ThemeContext = React.createContext();

const ThemeProviderWrapper = function (props) {
  const curThemeName = localStorage.getItem("appTheme") || "PureLightTheme";
  const [themeName, _setThemeName] = useState(curThemeName);
  const newTheme = themeCreator(themeName);
  const setThemeName = (themeName) => {
    localStorage.setItem("appTheme", themeName);
    _setThemeName(themeName);
  };

  const theme = createTheme({ ...newTheme }, ptBR);

  return (
    <StylesProvider injectFirst>
      <ThemeContext.Provider value={setThemeName}>
        <ThemeProvider theme={theme}>
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
            adapterLocale={ptBRAdapter}
          >
            {props.children}{" "}
          </LocalizationProvider>
        </ThemeProvider>
      </ThemeContext.Provider>
    </StylesProvider>
  );
};

export default ThemeProviderWrapper;
