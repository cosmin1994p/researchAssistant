export enum HttpStatusCode {
	Ok = 200,
	BadRequest = 400,
	Unauthorized = 401,
	PaymentRequired = 402,
	Forbidden = 403,
	NotFound = 404,
	MethodNotAllowed = 405,
	NotAcceptable = 406,
	ProxyAuthenticationRequired = 407,
	RequestTimeout = 408,
	Conflict = 409,
	Gone = 410,
	TooManyRequests = 429,
	InternalServerError = 500,
	NotImplemented = 501,
	BadGateway = 502,
	ServiceUnavailable = 503,
	GatewayTimeout = 504,
	HTTPVersionNotSupported = 505,
	VariantAlsoNegotiates = 506,
	InsufficientStorage = 507,
	LoopDetected = 508,
	NotExtended = 510,
	NetworkAuthenticationRequired = 511,
}

export enum HttpMethod {
	Get = 'GET',
	Post = 'POST',
	Put = 'PUT',
	Patch = 'PATCH',
	Delete = 'DELETE',
}

export const headers = { 'Content-Type': 'application/json' };

export const retryableStatusCodes: HttpStatusCode[] = [
	HttpStatusCode.RequestTimeout,
	HttpStatusCode.TooManyRequests,
	HttpStatusCode.InternalServerError,
	HttpStatusCode.NotImplemented,
	HttpStatusCode.BadGateway,
	HttpStatusCode.ServiceUnavailable,
	HttpStatusCode.GatewayTimeout,
	HttpStatusCode.HTTPVersionNotSupported,
	HttpStatusCode.VariantAlsoNegotiates,
	HttpStatusCode.InsufficientStorage,
	HttpStatusCode.LoopDetected,
	HttpStatusCode.NotExtended,
	HttpStatusCode.NetworkAuthenticationRequired,
];
