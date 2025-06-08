import React from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider, extendTheme, ColorModeScript } from "@chakra-ui/react";
import App from "./App";
import "./style.css";
import { EventProvider } from "./pages/EventsComponent";

// Extend the Chakra theme to set the default to dark mode
const theme = extendTheme({
  config: {
    initialColorMode: "dark", // Set the default theme to dark
    useSystemColorMode: false, // Ignore the user's system color mode
  },
});

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
    <EventProvider>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <App />
      </ChakraProvider>
    </EventProvider> 
);
