import { fetchJson } from '../fetcher';
import { projectEndpoint } from '../../endpoints';
import { headers, HttpMethod } from '../fetcher/types';

export async function updateProject(title: string, id: number): Promise<void> {
	await fetchJson(projectEndpoint, {
		method: HttpMethod.Put,
		headers: headers,
		body: JSON.stringify({
			title: title,
			id: id,
		}),
	});
}

export async function createProject(title: string): Promise<void> {
	await fetchJson(projectEndpoint, {
		method: HttpMethod.Post,
		headers: headers,
		body: JSON.stringify({
			title: title,
		}),
	});
}

export async function deleteProject(id: number): Promise<void> {
	await fetchJson(`${projectEndpoint}/${id}`, {
		method: HttpMethod.Delete,
		headers: headers,
	});
}
