export interface IGetTokenQuery {
    code: string;
    redirect_uri: string;
    grant_type: string;
}