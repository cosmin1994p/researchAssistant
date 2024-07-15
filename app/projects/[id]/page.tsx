import React from 'react';

interface ProjectParams {
	params: {
		id: number;
	}
}

export default function Project({ params }: ProjectParams): React.ReactNode {
	return <p>Current query param is: {params.id}</p>;
}
