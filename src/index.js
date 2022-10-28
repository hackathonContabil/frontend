import React from "react";
import Routes from "./routes";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { GlobalStyle } from "./globalStyle";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const options = {
  position: positions.TOP_RIGHT,
  timeout: 5000,
  offset: "5px",
  transition: transitions.SCALE,
};

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <AlertProvider template={AlertTemplate} {...options}>
        <Routes />
      </AlertProvider>
    </BrowserRouter>
  );
}

export default App;
