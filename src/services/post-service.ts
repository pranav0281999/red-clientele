import {FetchClient} from "./fetch-client";
import {LocalStorageEnum} from "../enums/local-storage-enum";
import {IPostUpvoteQuery} from "../interfaces/i-post-service";
import {objectToURLSearchParams} from "../common/util-network";

export default class PostService {
    private readonly _fetchClient = new FetchClient();
    private readonly _baseUrl = "https://oauth.reddit.com/api";

    public upvote(query: IPostUpvoteQuery) {
        return this._fetchClient
            .build(this._baseUrl + "/vote")
            .useMethod("POST")
            .useFormData(objectToURLSearchParams(query))
            .useContentType("application/x-www-form-urlencoded")
            .useAuthorization(
                `bearer ${localStorage.getItem(LocalStorageEnum.AccessToken)}`
            )
            .fetch<{}>();
    }
}
