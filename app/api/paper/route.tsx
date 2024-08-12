import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../lib/db';

export async function POST(request: NextRequest) {
	const { title, projectId } = (await request.json()) as { title: string; projectId: number };

	try {
		await prisma.scientificPaper.create({
			data: {
				title: title,
				status: 'Uploaded',
				author: '-',
				journalTitle: '-',
				publishedYear: new Date(),
				project: {
					connect: {
						id: projectId,
					},
				},
			},
		});
		return NextResponse.json({ message: 'Data created!' }, { status: 201 });
	} catch (err) {
		console.log(err);
		return new Response('Error occurred!', { status: 500 });
	}
}
