import { Button } from '@mui/material';

interface SendPapersForUploadingProps {
	selectedPapers: unknown[];
}

export function SendPapersForUploading({ selectedPapers }: SendPapersForUploadingProps) {
	return <Button variant="contained">Process</Button>;
}
