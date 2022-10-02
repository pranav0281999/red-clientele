import { useEffect, useRef, useState } from "react";
import "./App.css";
import AuthService from "./services/auth-service";
import { redirectToOAuth } from "./common/util-auth";
import ProfileService from "./services/profile-service";
import { IProfileResult } from "./interfaces/i-profile-service";

function App() {
  let authService = new AuthService();
  let profileService = new ProfileService();
  let isGettingAccessToken = useRef<boolean>(false);
  let isRefreshingAccessToken = useRef<boolean>(false);
  let isProfileLoading = useRef<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [profile, setProfile] = useState<IProfileResult>();

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if (urlParams.has("code")) {
      getAccessToken(urlParams.get("code") ?? "");
    } else {
      getProfile();
    }
  }, []);

  const getAccessToken = async (code: string) => {
    if (isGettingAccessToken.current) {
      return;
    }
    try {
      isGettingAccessToken.current = true;
      setLoading(true);
      let getTokenResult = await authService.getAccessToken({
        code: code,
        grant_type: "authorization_code",
        redirect_uri: "http://localhost:3000/home",
      });
      localStorage.setItem("auth_token", getTokenResult.access_token);
      localStorage.setItem("auth_refresh_token", getTokenResult.refresh_token);
    } catch (e) {
      console.error(e);
      redirectToOAuth();
    } finally {
      isGettingAccessToken.current = false;
      setLoading(
        isGettingAccessToken.current || isRefreshingAccessToken.current
      );
      window.history.replaceState(null, "", window.location.href.split("?")[0]);
    }
  };

  const refreshAccessToken = async () => {
    if (isRefreshingAccessToken.current) {
      return;
    }
    if (!localStorage.getItem("auth_refresh_token")) {
      redirectToOAuth();
      return;
    }
    try {
      isRefreshingAccessToken.current = true;
      setLoading(true);
      let getTokenResult = await authService.refreshAccessToken({
        grant_type: "refresh_token",
        refresh_token: localStorage.getItem("auth_refresh_token") ?? "",
      });
      localStorage.setItem("auth_token", getTokenResult.access_token);
      localStorage.setItem("auth_refresh_token", getTokenResult.refresh_token);
    } catch (e) {
      console.error(e);
      redirectToOAuth();
    } finally {
      isRefreshingAccessToken.current = false;
      setLoading(
        isGettingAccessToken.current || isRefreshingAccessToken.current
      );
    }
  };

  const getProfile = async () => {
    if (isProfileLoading.current) {
      return;
    }
    try {
      isProfileLoading.current = true;
      setProfile(await profileService.getProfile());
    } catch (e) {
      console.error(e);
    } finally {
      isProfileLoading.current = false;
    }
  };

  return (
    <div className="App">
      {loading ? <p>Loading...</p> : <p>Hello</p>}
      {!!profile ? <p>{profile.name}</p> : "profile not loaded"}
    </div>
  );
}

export default App;
