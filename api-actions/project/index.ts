import { fetchJson } from '../fetcher';
import { projectEndpoint } from '../../endpoints';
import { headers, HttpMethod } from '../fetcher/types';
import { Project } from '../../data/project/types';
import { DataFetchError } from '../fetcher/error/data-fetch-error';
import { Prisma } from '@prisma/client';

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

export async function getFilteredProjects(search: string): Promise<Project[]> {
	const data = await fetchJson<Prisma.ProjectUncheckedCreateInput[]>(`${projectEndpoint}/${search}`, {
		method: HttpMethod.Get,
		headers: headers,
	});

	if (data instanceof DataFetchError) {
		return [];
	}

	return data.map(
		(entry): Project => ({
			id: Number(entry.id),
			title: entry.title,
			createdAt: new Date(String(entry.createdAt)),
			papersProcessed: entry.papersProcessed,
			queries: entry.queries,
		}),
	);
}
