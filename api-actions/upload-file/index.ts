import { fetchJson } from '../fetcher';
import { uploadFileEndpoint } from '../../endpoints';
import { HttpMethod } from '../fetcher/types';

export async function uploadFileLocally(file: File): Promise<void> {
	const formData = new FormData();
	formData.append('file', file);

	console.log(formData.get('file'));

	await fetchJson(uploadFileEndpoint, {
		method: HttpMethod.Post,
		body: formData,
	});
}
