import React, { useState } from 'react';
import { Box, Typography, Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export function UserTopLevelInformation(): React.ReactNode {
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
		// @ts-ignore
		setAnchorEl(event.currentTarget);
	};

	const handleClose = (): void => {
		setAnchorEl(null);
	};

	return (
		<Box display="flex" justifyContent="space-between" alignItems="center" padding={6}>
			<Box>
				<Typography variant="h6">Hello, User First Name</Typography>
				<Typography variant="body1">Have a nice day</Typography>
			</Box>
			<Box display="flex" alignItems="center">
				<Avatar src="/path/to/avatar.jpg" alt="User" />
				<Typography variant="body1" marginLeft={2}>
					First Name, Last Name
				</Typography>
				<IconButton onClick={handleClick}>
					<MoreVertIcon />
				</IconButton>
				<Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
					<MenuItem onClick={handleClose}>Profile</MenuItem>
					<MenuItem onClick={handleClose}>Settings</MenuItem>
					<MenuItem onClick={handleClose}>Logout</MenuItem>
				</Menu>
			</Box>
		</Box>
	);
}
