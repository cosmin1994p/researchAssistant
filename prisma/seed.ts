import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
	const user = await prisma.user.create({
		data: {
			userName: 'John',
			lastName: 'Doe',
			email: 'john.doe@example.com',
			projects: {
				create: [
					{
						title: 'Project Alpha',
						papersProcessed: 5,
						queries: 10,
						scientificPapers: {
							create: [
								{
									title: 'Paper Alpha 1',
									author: 'Author A',
									publishedYear: new Date('2021-01-01'),
									journalTitle: 'Journal A',
									status: 'Published',
								},
								{
									title: 'Paper Alpha 2',
									author: 'Author B',
									publishedYear: new Date('2021-02-01'),
									journalTitle: 'Journal B',
									status: 'Draft',
								},
							],
						},
					},
					{
						title: 'Project Beta',
						papersProcessed: 3,
						queries: 7,
						scientificPapers: {
							create: [
								{
									title: 'Paper Beta 1',
									author: 'Author C',
									publishedYear: new Date('2022-01-01'),
									journalTitle: 'Journal C',
									status: 'Published',
								},
								{
									title: 'Paper Beta 2',
									author: 'Author D',
									publishedYear: new Date('2022-02-01'),
									journalTitle: 'Journal D',
									status: 'Under Review',
								},
							],
						},
					},
				],
			},
		},
	});

	console.log(`Created user with projects and scientific papers: ${user.email}`);
}
main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
