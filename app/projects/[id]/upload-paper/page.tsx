'use client';

import React, { useState } from 'react';
import { Box, Button, Typography, List, ListItem, Stack } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

// @ts-ignore
export default function UploadPaper({ params }): React.ReactNode {
	const [files, setFiles] = useState<File[]>([]);

	const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
	};

	const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		const newFiles = Array.from(event.dataTransfer.files);
		setFiles((prevFiles) => [...prevFiles, ...newFiles]);
	};

	const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			const fileArray = Array.from(event.target.files);
			setFiles((prevFiles) => [...prevFiles, ...fileArray]);
		}
	};

	return (
		<>
			<Stack spacing={2}>
				<Stack>
					<Typography variant="h5">AI in healthcare</Typography>
					<Typography variant="subtitle1">Upload your papers</Typography>
				</Stack>

				<Box
					onDragOver={handleDragOver}
					onDrop={handleDrop}
					sx={{
						p: 2,
						border: '2px dashed #ccc',
						minHeight: 100,
						cursor: 'pointer',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Typography>Drag and drop some files here, or click to select files</Typography>
					<input
						type="file"
						multiple
						style={{ display: 'none' }}
						id="file-upload"
						onChange={handleFileSelect}
					/>
					<label htmlFor="file-upload">
						<Button variant="contained" component="span" startIcon={<CloudUploadIcon />}>
							Select Files
						</Button>
					</label>
				</Box>

				<List>
					{files.map((file, index) => (
						<ListItem key={index}>
							{file.name} - {file.size} bytes
						</ListItem>
					))}
				</List>
			</Stack>
		</>
	);
}
