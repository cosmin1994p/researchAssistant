export class NonRetryableError extends Error {
	public constructor(response: Response) {
		super();

		this.stack = new Error().stack;
		this.name = 'Non-retryable error';
		this.message = `Returned status is non-retryable: ${response.status}.`;
	}
}
