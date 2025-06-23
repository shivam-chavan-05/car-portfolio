import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { useCarControls } from "./store";

function KeyboardControls() {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.repeat) return;
      if (e.key === "ArrowUp" || e.key === "w") useCarControls.getState().setKey("forward", true);
      if (e.key === "ArrowDown" || e.key === "s") useCarControls.getState().setKey("backward", true);
      if (e.key === "ArrowLeft" || e.key === "a") useCarControls.getState().setKey("left", true);
      if (e.key === "ArrowRight" || e.key === "d") useCarControls.getState().setKey("right", true);
    };
    const handleKeyUp = (e) => {
      if (e.key === "ArrowUp" || e.key === "w") useCarControls.getState().setKey("forward", false);
      if (e.key === "ArrowDown" || e.key === "s") useCarControls.getState().setKey("backward", false);
      if (e.key === "ArrowLeft" || e.key === "a") useCarControls.getState().setKey("left", false);
      if (e.key === "ArrowRight" || e.key === "d") useCarControls.getState().setKey("right", false);
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);
  return null;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <KeyboardControls />
    <App />
  </React.StrictMode>
);