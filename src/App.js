import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

function App() {
  const [token, setToken] = useState(() => {
    const localData = localStorage.getItem("TOKENPORT");
    if (localData === "undefined") {
      return "";
    } else {
      return JSON.parse(localData);
    }
  });
  return token ? (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/sign-in" element={<SignIn setToken={setToken} />} />
    </Routes>
  ) : (
    <Routes>
      <Route path="/" element={<SignIn setToken={setToken} />} />
      <Route path="/sign-in" element={<SignIn setToken={setToken} />} />
      <Route path="/sign-up" element={<SignUp />} />
    </Routes>
  );
}

export default App;
