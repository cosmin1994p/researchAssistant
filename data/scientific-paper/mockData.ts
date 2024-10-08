import { ScientificPaper, PaperStatus } from './types';

export const mockedPapers: ScientificPaper[] = [
	{
		id: 1,
		author: 'John Doe',
		publishedYear: new Date('2023-05-15'),
		journalTitle: 'Journal of Science',
		title: 'Advancements in Quantum Computing',
		status: PaperStatus.Processed,
	},
	{
		id: 2,
		author: 'Jane Smith',
		publishedYear: new Date('2022-09-28'),
		journalTitle: 'Nature',
		title: 'Genetic Engineering of Plants',
		status: PaperStatus.Unprocessed,
	},
	{
		id: 3,
		author: 'Michael Johnson',
		publishedYear: new Date('2024-01-10'),
		journalTitle: 'New England Journal of Medicine',
		title: 'COVID-19 Vaccine Efficacy Trials',
		status: PaperStatus.Summarized,
	},
	{
		id: 4,
		author: 'Emily Brown',
		publishedYear: new Date('2023-11-20'),
		journalTitle: 'Science Advances',
		title: 'Artificial Intelligence in Healthcare',
		status: PaperStatus.Processed,
	},
	{
		id: 5,
		author: 'David Lee',
		publishedYear: new Date('2022-12-05'),
		journalTitle: 'Cell',
		title: 'Stem Cell Research Breakthroughs',
		status: PaperStatus.Unprocessed,
	},
	{
		id: 6,
		author: 'Sophia Clark',
		publishedYear: new Date('2024-03-08'),
		journalTitle: 'Nature Communications',
		title: 'Climate Change Impacts on Biodiversity',
		status: PaperStatus.Processed,
	},
	{
		id: 7,
		author: 'Robert White',
		publishedYear: new Date('2023-06-18'),
		journalTitle: 'Proceedings of the National Academy of Sciences',
		title: 'Neuroscience of Decision Making',
		status: PaperStatus.Summarized,
	},
	{
		id: 8,
		author: 'Olivia Green',
		publishedYear: new Date('2022-08-11'),
		journalTitle: 'Journal of Experimental Medicine',
		title: 'Immunotherapy Advances in Cancer Treatment',
		status: PaperStatus.Unprocessed,
	},
	{
		id: 9,
		author: 'William Davis',
		publishedYear: new Date('2024-02-22'),
		journalTitle: 'PNAS',
		title: 'Gene Editing Techniques',
		status: PaperStatus.Processed,
	},
	{
		id: 10,
		author: 'Emma Johnson',
		publishedYear: new Date('2023-04-30'),
		journalTitle: 'Science',
		title: 'Astrophysics Discoveries in Black Holes',
		status: PaperStatus.Unprocessed,
	},
];
