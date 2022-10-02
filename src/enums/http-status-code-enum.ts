// Source: https://docs.microsoft.com/en-us/uwp/api/windows.web.http.httpstatuscode

export enum HttpStatusCodeEnum {
    Accepted = 202,
    // Accepted - The request has been accepted for further processing.
    AlreadyReported = 208,
    // AlreadyReported - Some of the results of the requested operation were already reported.
    // This status code is an HTTP extension used with Web Distributed Authoring and Versioning(WebDAV).
    // It can only be returned if the client HTTP request included the DAV header in the request.This status code is documented in IETF RFC 5842.
    BadGateway = 502,
    // BadGateway - An intermediate proxy server received a bad response from another proxy or the origin server.
    BadRequest = 400,
    // BadRequest - The request could not be understood by the server.
    // This status code is sent when no other error is applicable, or if the exact error is unknown or does not have its own error code.
    Conflict = 409,
    // Conflict - The request could not be carried out because of a conflict on the server.
    Continue = 100,
    // Continue - The client should continue with its request.
    Created = 201,
    // Created - The request resulted in a new resource created before the response was sent.
    ExpectationFailed = 417,
    // ExpectationFailed - An expectation given in an Expect header could not be met by the server.
    FailedDependency = 424,
    // FailedDependency - -The method could not be performed on the resource because the requested action depended on another action and that action failed.
    // This status code is an HTTP extension used with Web Distributed Authoring and Versioning(WebDAV).This status code is documented in IETF RFC 4918.
    Forbidden = 403,
    // Forbidden - The server refuses to fulfill the request.
    Found = 302,
    // Found - The requested information is located at the URI specified in the Location header.
    // The default action when this status is received is to follow the Location header associated with the response.
    // When the original request method was POST, the redirected request will use the GET method.
    GatewayTimeout = 504,
    // GatewayTimeout - An intermediate proxy server timed out while waiting for a response from another proxy or the origin server.
    Gone = 410,
    // Gone - The requested resource is no longer available.
    HttpVersionNotSupported = 505,
    // HttpVersionNotSupported - The requested HTTP version is not supported by the server.
    IMUsed = 226,
    // IMUsed - The server has fulfilled a GET request for the resource and the response is the result of one or more actions applied to the current instance.
    // This status code is documented in IETF RFC 3229.
    InsufficientStorage = 507,
    // InsufficientStorage - The method could not be performed on the resource because the server is unable to store the representation needed to successfully complete the request.This condition is considered to be temporary.
    // This status code is an HTTP extension used with Web Distributed Authoring and Versioning(WebDAV).This status code is documented in IETF RFC 4918.
    InternalServerError = 500,
    // InternalServerError - A generic error has occurred on the server.
    LengthRequired = 411,
    // LengthRequired - The required Content - Length header is missing.
    Locked = 423,
    // Locked - The source or destination resource of a method is locked.This response should contain an appropriate precondition or post - condition code.
    // This status code is an HTTP extension used with Web Distributed Authoring and Versioning(WebDAV).This status code is documented in IETF RFC 4918.
    LoopDetected = 508,
    // LoopDetected - The server terminated an operation because it encountered an infinite loop while processing a request.This status indicates that the entire operation failed.
    // This status code is an HTTP extension used with Web Distributed Authoring and Versioning(WebDAV).It can only be returned if the client HTTP request included the DAV header in the request.This status code is documented in IETF RFC 5842.
    MethodNotAllowed = 405,
    // MethodNotAllowed - The HTTP method in the request is not allowed on the requested resource.
    MovedPermanently = 301,
    // MovedPermanently - The requested information has been moved to the URI specified in the Location header.The default action when this status is received is to follow the Location header associated with the response.
    MultipleChoices = 300,
    // MultipleChoices - The requested information has multiple representations.The default action is to treat this status as a redirect and follow the contents of the Location header associated with this response.
    MultiStatus = 207,
    // MultiStatus - The response provides status for multiple independent operations.Specific error messages appear in the body of the multi - status response.
    // This status code is an HTTP extension used with Web Distributed Authoring and Versioning(WebDAV).This status code is documented in IETF RFC 4918.
    NetworkAuthenticationRequired = 511,
    // NetworkAuthenticationRequired - The server indicates that the client needs to authenticate to gain network access.The response should contain a link to a resource that allows the user to submit credentials.
    // This status code is documented in IETF RFC 6585.
    NoContent = 204,
    // NoContent - The request has been successfully processed and that the response is intentionally blank.
    NonAuthoritativeInformation = 203,
    // NonAuthoritativeInformation - The returned meta - information is from a cached copy instead of the origin server and therefore may be incorrect.
    None = 0,
    // None - The client request wasn't successful.
    NotAcceptable = 406,
    // NotAcceptable - The client has indicated with Accept headers that it will not accept any of the available representations of the resource.
    NotExtended = 510,
    // NotExtended - The policy for accessing the resource has not been met in the request.
    // This status code is documented in IETF RFC 2774.
    NotFound = 404,
    // NotFound - The requested resource does not exist on the server.
    NotImplemented = 501,
    // NotImplemented - The server does not support the requested function.
    NotModified = 304,
    // NotModified - The client's cached copy is up to date. The contents of the resource are not transferred.
    Ok = 200,
    // Ok - The request succeeded and that the requested information is in the response.This is the most common status code to receive.
    PartialContent = 206,
    // PartialContent - The response is a partial response as requested by a GET request that includes a byte range.
    PaymentRequired = 402,
    // PaymentRequired - This code is reserved for future use.
    PermanentRedirect = 308,
    // PermanentRedirect - The target resource has been assigned a new permanent URI and any future references to this resource should use one of the returned URIs specified in the Location header.
    // This status code is documented in IETF draft draft - reschke - http - status - 308.
    PreconditionFailed = 412,
    // PreconditionFailed - A condition set for this request failed, and the request cannot be carried out.Conditions are set with conditional request headers like If - Match, If - None - Match, or If - Unmodified - Since.
    PreconditionRequired = 428,
    // PreconditionRequired - The origin server requires the request to be conditional.
    // This status code is documented in IETF RFC 6585.
    Processing = 102,
    // Processing - The server has received a Web Distributed Authoring and Versioning(WebDAV) request and is processing the request.
    // This status code is an HTTP extension used with WebDAV.It can only be returned if the client HTTP request included the DAV header in the request.This status code is documented in IETF RFC 2518.
    ProxyAuthenticationRequired = 407,
    // ProxyAuthenticationRequired - The requested proxy requires authentication.The Proxy - Authenticate header contains the details of how to perform the authentication.
    RequestedRangeNotSatisfiable = 416,
    // RequestedRangeNotSatisfiable - The range of data requested from the resource cannot be returned, either because the beginning of the range is before the beginning of the resource, or the end of the range is after the end of the resource.
    RequestEntityTooLarge = 413,
    // RequestEntityTooLarge - The request is too large for the server to process.
    RequestHeaderFieldsTooLarge = 431,
    // RequestHeaderFieldsTooLarge - The server is unwilling to process the request because its header fields are too large.The request may be resubmitted after reducing the size of the request header fields.
    // This status code is documented in IETF RFC 6585.
    RequestTimeout = 408,
    // RequestTimeout - The client did not send a request within the time the server was expecting the request.
    RequestUriTooLong = 414,
    // RequestUriTooLong - The URI is too long.
    ResetContent = 205,
    // ResetContent - The client should reset(not reload) the current resource.
    SeeOther = 303,
    // SeeOther - Automatically redirects the client to the URI specified in the Location header as the result of a POST.The request to the resource specified by the Location header will be made with the GET method.
    ServiceUnavailable = 503,
    // ServiceUnavailable - The server is temporarily unavailable, usually due to high load or maintenance.
    SwitchingProtocols = 101,
    // SwitchingProtocols - The HTTP protocol version or protocol is being changed.
    TemporaryRedirect = 307,
    // TemporaryRedirect - The request information is located at the URI specified in the Location header.The default action when this status is received is to follow the Location header associated with the response.
    // When the original request method was POST, the redirected request will also use the POST method.
    TooManyRequests = 429,
    // TooManyRequests - The user has sent too many requests in a given amount of time.The response should include details explaining the condition, and may include a Retry - After header indicating how long to wait before making a new request.
    // This status code is documented in IETF RFC 6585.
    Unauthorized = 401,
    // Unauthorized - The requested resource requires authentication.The WWW - Authenticate header contains the details of how to perform the authentication.
    UnprocessableEntity = 422,
    // UnprocessableEntity - The server understands the content type of the request entity and the syntax of the request entity is correct, but the server was unable to process the contained instructions.
    // This status code is an HTTP extension used with Web Distributed Authoring and Versioning(WebDAV).This status code is documented in IETF RFC 4918.
    UnsupportedMediaType = 415,
    // UnsupportedMediaType - The request is an unsupported type.
    UpgradeRequired = 426,
    // UpgradeRequired - The client should switch to a different protocol such as TLS / 1.0.
    // This status code is documented in IETF RFC 2917.
    UseProxy = 305,
    // UseProxy - The request should use the proxy server at the URI specified in the Location header.
    VariantAlsoNegotiates = 506,
    // VariantAlsoNegotiates - The server has an internal configuration error. The chosen variant resource is configured to engage in transparent content negotiation itself, and is therefore not a proper end point in the negotiation process.
    // This status code is documented in IETF RFC 2295.
}
