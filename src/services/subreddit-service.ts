import {FetchClient} from "./fetch-client";
import {LocalStorageEnum} from "../enums/local-storage-enum";
import {IGetSubredditAboutResult} from "../interfaces/i-subreddit-service";

export default class SubredditService {
    private readonly _fetchClient = new FetchClient();
    private readonly _baseUrl = "https://oauth.reddit.com/r";

    public getAbout(subreddit: string) {
        return this._fetchClient
            .build(this._baseUrl + `/${subreddit}/about`)
            .useMethod("GET")
            .useAuthorization(
                `bearer ${localStorage.getItem(LocalStorageEnum.AccessToken)}`
            )
            .fetch<IGetSubredditAboutResult>();
    }
}
