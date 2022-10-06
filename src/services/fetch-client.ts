import { HttpStatusCodeEnum } from "../enums/http-status-code-enum";
import { buildQueryString } from "./fetch-client-util";
import { redirectToOAuth } from "../common/util-auth";

export class FetchClient {
  public build(path: string): FetchClientChain {
    return new FetchClientChain(path);
  }
}

export class FetchClientChain {
  private _path: string;
  private readonly _init: RequestInit;

  public constructor(path: string) {
    this._path = path;
    this._init = {
      method: "GET",
      headers: new Headers(),
    };
  }

  public useQueryString<TParam>(param: TParam): FetchClientChain {
    if (param == null) {
      return this;
    }

    let concat = this._path.indexOf("?") !== -1;
    let anchorChar = concat ? "&" : "?";

    let queryString = buildQueryString(param);
    this._path += anchorChar + queryString;
    return this;
  }

  public useMethod(method: string): FetchClientChain {
    this._init.method = method;
    return this;
  }

  public useMode(mode: RequestMode): FetchClientChain {
    this._init.mode = mode;
    return this;
  }

  public useCredentials(credentials: RequestCredentials): FetchClientChain {
    this._init.credentials = credentials;
    return this;
  }

  public useBody<T>(body: T): FetchClientChain {
    this._init.body = JSON.stringify(body);
    return this;
  }

  public useAuthorization(token: string): FetchClientChain {
    (this._init.headers as Headers).set("Authorization", token);
    return this;
  }

  public useContentType(type: string): FetchClientChain {
    (this._init.headers as Headers).set("Content-Type", type);
    return this;
  }

  public useUserAgent(userAgent: string): FetchClientChain {
    (this._init.headers as Headers).set("User-Agent", userAgent);
    return this;
  }

  public useContentLength(contentLength: string): FetchClientChain {
    (this._init.headers as Headers).set("content-length", contentLength);
    return this;
  }

  public useFormData(body: FormData): FetchClientChain {
    this._init.body = body;
    return this;
  }

  public async fetch<TResponse>(): Promise<TResponse> {
    let response = await fetch(this._path, this._init);
    if (!response.ok) {
      switch (response.status) {
        case HttpStatusCodeEnum.Unauthorized:
          redirectToOAuth();
          break;
        default:
          throw new FetchClientHttpError(
            response.status,
            response.statusText,
            response
          );
      }
    }

    let json = await response.json();
    return json as TResponse;
  }

  public async fetchNoContent(): Promise<void> {
    let response = await fetch(this._path, this._init);
    if (response.status !== HttpStatusCodeEnum.NoContent) {
      throw new FetchClientHttpError(
        response.status,
        `Expected '204 : No Content' but received '${response.status} : ${response.statusText}' instead.`,
        response
      );
    }
  }
}

export class FetchClientHttpError {
  public statusMessage: string;
  public status: number;
  public response: Response;

  public constructor(
    status: number,
    statusMessage: string,
    response: Response
  ) {
    this.status = status;
    this.statusMessage = statusMessage;
    this.response = response;
  }
}
