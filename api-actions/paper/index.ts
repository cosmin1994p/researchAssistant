import { fetchJson } from '../fetcher';
import { paperEndpoint } from '../../endpoints';
import { headers, HttpMethod } from '../fetcher/types';

export async function uploadPaperFile(title: string, id: number): Promise<void> {
	await fetchJson(paperEndpoint, {
		method: HttpMethod.Post,
		headers: headers,
		body: JSON.stringify({
			title: title.replaceAll(' ', '_'),
			projectId: id,
		}),
	});
}
