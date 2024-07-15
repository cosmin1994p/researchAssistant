export class DataFetchError {
	private readonly _errorCode: number;
	private readonly _message: string;

	public constructor(errorCode: number, message: string) {
		this._errorCode = errorCode;
		this._message = message;
	}

	get errorCode(): number {
		return this._errorCode;
	}

	get message(): string {
		return this._message;
	}
}
