import { useEffect, useRef } from "react";
import "./App.css";
import AuthService from "./services/auth-service";
import { redirectToOAuth } from "./common/util-auth";

function App() {
  let authService = new AuthService();
  let isGettingAccessToken = useRef<boolean>(false);
  let isRefreshingAccessToken = useRef<boolean>(false);

  useEffect(() => {
    // getAccessToken();
    refreshAccessToken();
  }, []);

  const getAccessToken = async () => {
    if (isGettingAccessToken.current) {
      return;
    }
    try {
      isGettingAccessToken.current = true;
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      if (urlParams.has("code")) {
        let getTokenResult = await authService.getAccessToken({
          code: urlParams.get("code") ?? "",
          grant_type: "authorization_code",
          redirect_uri: "http://localhost:3000/home",
        });
        localStorage.setItem("auth_token", getTokenResult.access_token);
        localStorage.setItem(
          "auth_refresh_token",
          getTokenResult.refresh_token
        );
      } else {
        redirectToOAuth();
      }
    } catch (e) {
      console.error(e);
      redirectToOAuth();
    } finally {
      isGettingAccessToken.current = false;
    }
  };

  const refreshAccessToken = async () => {
    if (isRefreshingAccessToken.current) {
      return;
    }
    if (!localStorage.getItem("auth_refresh_token")) {
      getAccessToken();
      return;
    }
    try {
      isRefreshingAccessToken.current = true;
      let getTokenResult = await authService.refreshAccessToken({
        grant_type: "refresh_token",
        refresh_token: localStorage.getItem("auth_refresh_token") ?? "",
      });
      localStorage.setItem("auth_token", getTokenResult.access_token);
      localStorage.setItem("auth_refresh_token", getTokenResult.refresh_token);
    } catch (e) {
      console.error(e);
      getAccessToken();
    } finally {
      isRefreshingAccessToken.current = false;
    }
  };

  return <div className="App">Hey</div>;
}

export default App;
