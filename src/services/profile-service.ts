import { FetchClient } from "./fetch-client";
import { IProfileResult } from "../interfaces/i-profile-service";
import { LocalStorageEnum } from "../enums/local-storage-enum";

export default class ProfileService {
  private readonly _fetchClient = new FetchClient();
  private readonly _baseUrl = "https://oauth.reddit.com/api/v1";

  public getProfile() {
    return this._fetchClient
      .build(this._baseUrl + "/me")
      .useMethod("GET")
      .useAuthorization(
        `bearer ${localStorage.getItem(LocalStorageEnum.AccessToken)}`
      )
      .useContentType("application/x-www-form-urlencoded")
      .fetch<IProfileResult>();
  }
}
