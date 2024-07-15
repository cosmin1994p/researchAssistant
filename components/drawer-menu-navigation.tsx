import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FolderIcon from '@mui/icons-material/Folder';
import Link from 'next/link';
import { Box } from '@mui/system';

export default function DrawerMenuNavigation() {
	return (
		<Drawer
			variant="permanent"
			sx={{
				width: 220,
				flexShrink: 0,
				[`& .MuiDrawer-paper`]: { width: 220, boxSizing: 'border-box' },
			}}
			open
		>
			<Box paddingLeft="16px">
				<Typography variant="body1" component="span" sx={{ fontWeight: 'bold' }}>
					Research Assistant
				</Typography>
			</Box>
			<List>
				{/* Projects */}
				<Link href="/projects">
					<ListItem key="Projects" sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.1)' } }}>
						<ListItemIcon>
							<FolderIcon />
						</ListItemIcon>
						<ListItemText primary="Projects" />
					</ListItem>
				</Link>

				{/* User Dashboard */}
				<Link href="/user-dashboard">
					<ListItem key="User Dashboard" sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.1)' } }}>
						<ListItemIcon>
							<DashboardIcon />
						</ListItemIcon>
						<ListItemText primary="User Dashboard" />
					</ListItem>
				</Link>
			</List>
		</Drawer>
	);
}
