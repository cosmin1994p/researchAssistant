import { Button } from '@mui/material';

interface SendPapersForSummarizationProps {
	selectedPapers: unknown[];
}

export function SendPapersForSummarization({ selectedPapers }: SendPapersForSummarizationProps) {
	return <Button variant="contained">Summarize</Button>;
}
