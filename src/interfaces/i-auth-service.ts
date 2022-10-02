export interface IGetAccessTokenQuery {
  code: string;
  redirect_uri: string;
  grant_type: string;
}

export interface IGetAccessTokenResult {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
}

export interface IRefreshAccessTokenQuery {
  grant_type: string;
  refresh_token: string;
}

export interface IRefreshAccessToken {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}
