import { useEffect, useRef, useState } from "react";
import "./App.css";
import AuthService from "./services/auth-service";
import { redirectToOAuth } from "./common/util-auth";
import ProfileService from "./services/profile-service";
import { IProfileResult } from "./interfaces/i-profile-service";
import { GrantTypeEnum } from "./enums/grant-type-enum";
import { LocalStorageEnum } from "./enums/local-storage-enum";
import { IGetAllBestResult } from "./interfaces/i-listing-service";
import ListingService from "./services/listing-service";

function App() {
  let authService = new AuthService();
  let profileService = new ProfileService();
  let listingService = new ListingService();
  let isGettingAccessToken = useRef<boolean>(false);
  let isRefreshingAccessToken = useRef<boolean>(false);
  let isProfileLoading = useRef<boolean>(false);
  let isListingLoading = useRef<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [profile, setProfile] = useState<IProfileResult>();
  const [listing, setListing] = useState<IGetAllBestResult>();

  useEffect(() => {
    initialLoad();
  }, []);

  const initialLoad = async () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if (urlParams.has("code")) {
      await getAccessToken(urlParams.get("code") ?? "");
      getProfile();
      getAllHot();
    } else if (!localStorage.getItem(LocalStorageEnum.AccessToken)) {
      redirectToOAuth();
    } else {
      getProfile();
      getAllHot();
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

  const getAllHot = async () => {
    if (isListingLoading.current) {
      return;
    }
    try {
      isListingLoading.current = true;
      setListing(
        await listingService.getAllBest({
          g: "GLOBAL",
          limit: "50",
        })
      );
    } catch (e) {
      console.error(e);
    } finally {
      isListingLoading.current = false;
    }
  };

  return (
    <div className="App">
      {loading ? <p>Loading...</p> : <p>Hello</p>}
      {!!profile ? <p>{profile.name}</p> : "profile not loaded"}
      {!!listing
        ? listing.data.children.map((child) => (
            <p key={child.data.id}>{child.data.title}</p>
          ))
        : "listing not loaded"}
    </div>
  );
}

export default App;
