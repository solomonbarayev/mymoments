import "./App.css";
import logo from "./assets/logo.png";
import Form from "./components/Form";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

const theme = createTheme({
  direction: "rtl", // Both here and <body dir="rtl">
});

// Create rtl cache
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

function App() {
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <div className="App">
          <header className="logo-container">
            <img src={logo} alt="logo" className="logo" />
            <h1 className="header">צור את ההדפסה שלך</h1>
          </header>
          <Form />
        </div>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;
