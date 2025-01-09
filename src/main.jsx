import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeContextProvider } from "./Context/themeContext.jsx";
import { AuthContextProvider } from "./Context/authContext.jsx";
import { NotifContextProvider } from "./Context/notifContext.jsx";
import { DarkModeProvider } from "./Context/darkModeContext.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <NotifContextProvider>
        <ThemeContextProvider>
          <DarkModeProvider>
            <App />
          </DarkModeProvider>
        </ThemeContextProvider>
      </NotifContextProvider>
    </AuthContextProvider>
  </StrictMode>
);
