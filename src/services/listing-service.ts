import { FetchClient } from "./fetch-client";
import {
  IGetAllBestQuery,
  IGetAllBestResult,
} from "../interfaces/i-listing-service";
import { LocalStorageEnum } from "../enums/local-storage-enum";

export default class ListingService {
  private readonly _fetchClient = new FetchClient();
  private readonly _baseUrl = "https://oauth.reddit.com";

  public getAllBest(query: IGetAllBestQuery) {
    return this._fetchClient
      .build(this._baseUrl + "/hot")
      .useMethod("GET")
      .useQueryString(query)
      .useAuthorization(
        `bearer ${localStorage.getItem(LocalStorageEnum.AccessToken)}`
      )
      .fetch<IGetAllBestResult>();
  }
}
