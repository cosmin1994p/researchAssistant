export class RetryableError extends Error {
	public constructor(response: Response, retry: number) {
		super();

		this.stack = new Error().stack;
		this.name = 'Retryable error';
		this.message = `Returned status is retryable: ${response.status} - (retry attempt: ${retry}).`;
	}
}
