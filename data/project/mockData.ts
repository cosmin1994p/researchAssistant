import { Project } from './types';

export const mockedProjects: Project[] = [
	{
		id: 1,
		title: 'Project Alpha',
		createdAt: new Date(),
		papersProcessed: 150,
		queries: 12,
	},
	{
		id: 2,
		title: 'Project Beta',
		createdAt: new Date(),
		papersProcessed: 90,
		queries: 8,
	},
	{
		id: 3,
		title: 'Project Gamma',
		createdAt: new Date(2022, 0, 15),
		papersProcessed: 200,
		queries: 15,
	},
	{
		id: 4,
		title: 'Project Delta',
		createdAt: new Date(2022, 1, 20),
		papersProcessed: 120,
		queries: 10,
	},
	{
		id: 5,
		title: 'Project Epsilon',
		createdAt: new Date(2022, 2, 10),
		papersProcessed: 180,
		queries: 20,
	},
	{
		id: 6,
		title: 'Project Zeta',
		createdAt: new Date(2022, 3, 5),
		papersProcessed: 100,
		queries: 9,
	},
	{
		id: 7,
		title: 'Project Eta',
		createdAt: new Date(2022, 4, 8),
		papersProcessed: 135,
		queries: 14,
	},
];
