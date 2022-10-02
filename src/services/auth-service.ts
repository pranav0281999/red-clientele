import {
  IRefreshAccessTokenQuery,
  IRefreshAccessToken,
  IGetAccessTokenQuery,
  IGetAccessTokenResult,
} from "../interfaces/i-auth-service";
import { FetchClient } from "./fetch-client";
import { objectToURLSearchParams } from "../common/util-network";
import { encode } from "../common/base64";

export default class AuthService {
  private readonly _fetchClient = new FetchClient();
  private readonly _baseUrl = "https://www.reddit.com/api/v1";

  public getAccessToken(query: IGetAccessTokenQuery) {
    return this._fetchClient
      .build(this._baseUrl + "/access_token")
      .useMethod("POST")
      .useFormData(objectToURLSearchParams(query))
      .useAuthorization(
        `Basic ${encode(
          `${process.env.REACT_APP_CLIENT_ID}:${process.env.REACT_APP_CLIENT_SECRET}`
        )}`
      )
      .useContentType("application/x-www-form-urlencoded")
      .fetch<IGetAccessTokenResult>();
  }

  public refreshAccessToken(query: IRefreshAccessTokenQuery) {
    return this._fetchClient
      .build(this._baseUrl + "/access_token")
      .useMethod("POST")
      .useFormData(objectToURLSearchParams(query))
      .useAuthorization(
        `Basic ${encode(
          `${process.env.REACT_APP_CLIENT_ID}:${process.env.REACT_APP_CLIENT_SECRET}`
        )}`
      )
      .useContentType("application/x-www-form-urlencoded")
      .fetch<IRefreshAccessToken>();
  }
}
