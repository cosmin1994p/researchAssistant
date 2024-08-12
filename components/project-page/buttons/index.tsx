import { ScientificPaper } from '../../../data/scientific-paper/types';
import { TabQueryValue } from '../types';
import React from 'react';
import { GoToUploadPaperPageButton } from './go-to-upload-paper-page-button';
import { SendPapersForIndexing } from './send-papers-for-indexing';
import { SendPapersForSummarization } from './send-papers-for-summarization';
import { SendPapersForUploading } from './send-papers-for-processing';

export const getButtons = (
	currentProjectId: number,
	selectedPapers: ScientificPaper[] = [],
): Record<TabQueryValue, React.ReactNode[]> => {
	return {
		[TabQueryValue.Uploaded]: [
			<GoToUploadPaperPageButton currentProjectId={currentProjectId} key="upload-paper" />,
			<SendPapersForUploading selectedPapers={selectedPapers} key="for-processing" />,
		],
		[TabQueryValue.Processed]: [
			<SendPapersForIndexing selectedPapers={selectedPapers} key="for-indexing" />,
			<SendPapersForSummarization selectedPapers={selectedPapers} key="for-summarizing" />,
		],
		[TabQueryValue.Indexed]: [],
		[TabQueryValue.Summarized]: [],
		[TabQueryValue.IndexedAndSummarized]: [],
		[TabQueryValue.All]: [],
	};
};
