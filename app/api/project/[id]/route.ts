import { NextResponse } from 'next/server';
import prisma from '../../../../lib/db';

type Params = {
	id: number;
};

export async function DELETE(request: Request, context: { params: Params }) {
	const id = context.params.id;

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
