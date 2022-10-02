import React, { useEffect } from "react";
import "./App.css";
import AuthService from "./services/auth-service";

function App() {
  let authService = new AuthService();

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if (urlParams.has("code")) {
      authService.getToken({
        code: urlParams.get("code") ?? "",
        grant_type: "authorization_code",
        redirect_uri: "http://localhost:3000/home",
      });
    }
  }, []);

  return <div className="App">Hey</div>;
}

export default App;
