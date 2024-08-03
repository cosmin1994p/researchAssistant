import { NextResponse } from 'next/server';
import prisma from '../../../../lib/db';

type Params = {
	slug: number | string;
};

export async function DELETE(request: Request, context: { params: Params }) {
	const id = context.params.slug;

	try {
		await prisma.project.delete({
			where: {
				id: Number(id),
			},
		});

		return NextResponse.json({ message: 'Data removed!' });
	} catch (err) {
		console.log(err);
		return new Response('Error occurred!', { status: 500 });
	}
}

export async function GET(request: Request, context: { params: Params }) {
	const search = context.params.slug;

	try {
		const result = await prisma.project.findMany({
			where: {
				title: {
					contains: String(search),
				},
			},
		});

		return NextResponse.json(result);
	} catch (err) {
		console.log(err);
		return new Response('Error occurred!', { status: 500 });
	}
}
