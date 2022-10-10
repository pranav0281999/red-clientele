import { useEffect, useRef, useState } from "react";
import "./App.css";
import AuthService from "../../services/auth-service";
import { redirectToOAuth } from "../../common/util-auth";
import ProfileService from "../../services/profile-service";
import { IProfileResult } from "../../interfaces/i-profile-service";
import { GrantTypeEnum } from "../../enums/grant-type-enum";
import { LocalStorageEnum } from "../../enums/local-storage-enum";
import Listing from "./listing/listing";
import NavBar from "../../components/navBar/navBar";

function App() {
  let authService = new AuthService();
  let profileService = new ProfileService();
  let isGettingAccessToken = useRef<boolean>(false);
  let isRefreshingAccessToken = useRef<boolean>(false);
  let isProfileLoading = useRef<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [profile, setProfile] = useState<IProfileResult>();

  useEffect(() => {
    initialLoad();
  }, []);

  const initialLoad = async () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if (urlParams.has("code")) {
      await getAccessToken(urlParams.get("code") ?? "");
      getProfile();
    } else if (!localStorage.getItem(LocalStorageEnum.AccessToken)) {
      redirectToOAuth();
    } else {
      getProfile();
    }
  };

  const getAccessToken = async (code: string) => {
    if (isGettingAccessToken.current) {
      return;
    }
    try {
      isGettingAccessToken.current = true;
      setLoading(true);
      let getTokenResult = await authService.getAccessToken({
        code: code,
        grant_type: GrantTypeEnum.AuthorizationCode,
        redirect_uri: "http://localhost:3000",
      });
      localStorage.setItem(
        LocalStorageEnum.AccessToken,
        getTokenResult.access_token
      );
      localStorage.setItem(
        LocalStorageEnum.RefreshToken,
        getTokenResult.refresh_token
      );
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
    if (!localStorage.getItem(LocalStorageEnum.RefreshToken)) {
      redirectToOAuth();
      return;
    }
    try {
      isRefreshingAccessToken.current = true;
      setLoading(true);
      let getTokenResult = await authService.refreshAccessToken({
        grant_type: GrantTypeEnum.RefreshToken,
        refresh_token:
          localStorage.getItem(LocalStorageEnum.RefreshToken) ?? "",
      });
      localStorage.setItem(
        LocalStorageEnum.AccessToken,
        getTokenResult.access_token
      );
      localStorage.setItem(
        LocalStorageEnum.RefreshToken,
        getTokenResult.refresh_token
      );
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
    <div className={"app-div"}>
      {!!profile ? <NavBar profile={profile} /> : "profile not loaded"}
      {!loading ? <Listing /> : null}
    </div>
  );
}

export default App;
