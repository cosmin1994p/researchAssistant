import prisma from '../../../lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
	const data = { message: 'Hello world' };

	return NextResponse.json({ data });
}

export async function POST(request: Request) {
	const { title } = await request.json();

	try {
		await prisma.project.create({
			data: {
				title: title,
				papersProcessed: 0,
				queries: 0,
				userId: 1, // TODO: get current user id
			},
		});

		return NextResponse.json({ message: 'Data created!' });
	} catch (err) {
		console.log(err);
		return new Response('Error occurred!', { status: 500 });
	}
}

export async function PUT(request: Request) {
	const { title, id } = await request.json();

	try {
		const updated = await prisma.project.update({
			where: {
				id: Number(id),
			},
			data: {
				title: title,
			},
		});

		return NextResponse.json({ message: 'Data updated!' });
	} catch (err) {
		console.log(err);
		return new Response('Error occurred!', { status: 500 });
	}
}
