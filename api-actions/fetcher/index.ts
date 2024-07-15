import { DataFetchError } from './error/data-fetch-error';
import { NonRetryableError } from './error/non-retryable-error';
import { RetryableError } from './error/retryable-error';
import { retryableStatusCodes } from './types';
import { FetchError } from './error/types';

const maximumAttempts: number = 3;
const sleepBetweenAttempts: number = 1_000;

const sleep = (milliseconds: number): Promise<unknown> =>
	new Promise((resolve): unknown => setTimeout(resolve, milliseconds));

export const fetchJson = async <T>(
	url: string,
	options: RequestInit | undefined = undefined,
	attempt: number = 0,
): Promise<T | DataFetchError> => {
	try {
		const response = await fetch(url, options);

		if (!response.ok) {
			throw getErrorBasedOnResponseStatus(response, attempt);
		}

		return (await response.json()) as T;
	} catch (error) {
		attempt += 1;
		if (error instanceof NonRetryableError || attempt >= maximumAttempts) {
			return new DataFetchError(FetchError.ErrorCodeFetchDataJsonParse, (error as Error).message);
		}

		await sleep(sleepBetweenAttempts);
		return fetchJson<T>(url, options, attempt);
	}
};

const getErrorBasedOnResponseStatus = (response: Response, attempt: number): RetryableError | NonRetryableError => {
	if (retryableStatusCodes.includes(response.status)) {
		return new RetryableError(response, attempt + 1);
	}

	return new NonRetryableError(response);
};
