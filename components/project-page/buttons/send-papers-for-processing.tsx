import { Button } from '@mui/material';

interface SendPapersForUploadingProps {
	selectedPapers: unknown[];
}

export function SendPapersForUploading({ selectedPapers }: SendPapersForUploadingProps) {
	const handleSendToProcessClick = async (): Promise<void> => {
		console.log(selectedPapers);
	};

	return (
		<Button variant="contained" onClick={handleSendToProcessClick}>
			Process
		</Button>
	);
}
