import prisma from '../../../lib/db';
import { NextResponse } from 'next/server';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export async function POST(request: Request) {
	const { title } = await request.json();

	const { getUser } = getKindeServerSession();
	const user = await getUser();
	if (!user) {
		return new Response('Forbidden', { status: 403 });
	}

	try {
		await prisma.project.create({
			data: {
				title: title,
				papersProcessed: 0,
				queries: 0,
				user: {
					connect: {
						email: user.email!,
					},
				},
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
