import { Button } from '@mui/material';

interface SendPapersForIndexingProps {
	selectedPapers: unknown[];
}

export function SendPapersForIndexing({ selectedPapers }: SendPapersForIndexingProps) {
	return <Button variant="contained">Index</Button>;
}
