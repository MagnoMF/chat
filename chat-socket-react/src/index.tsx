import { createTheme, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "./assets/style/style.css";
import ReactDOM from "react-dom/client";
import App from "./App";

const theme = createTheme({});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <MantineProvider>
    <App />
  </MantineProvider>
);
