import React from "react";
import "./App.css";
import { ToastContainer} from "react-toastify";
import MainPage from "./pages/MainPage";
function App() {
  return (
    <div className="App">
      <MainPage />
      <ToastContainer position="top-center" />
    </div>
  );
}

export default App;
