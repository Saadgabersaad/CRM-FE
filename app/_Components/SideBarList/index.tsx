import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import DoneAllRoundedIcon from '@mui/icons-material/DoneAllRounded';
import LightbulbRoundedIcon from '@mui/icons-material/LightbulbRounded';
import LayersRoundedIcon from '@mui/icons-material/LayersRounded';
import DonutSmallIcon from '@mui/icons-material/DonutSmall';
import Link from 'next/link';

interface ListItemData {
    label: string;
    icon: React.ReactNode;
    link: string;
}

const listItems: ListItemData[] = [
    { label: 'Dashboard', icon: <GridViewRoundedIcon />, link: '/dashboard' },
    { label: 'Customers', icon: <PeopleAltRoundedIcon />, link: '/customers' },
    { label: 'Leads', icon: <DoneAllRoundedIcon />, link: '/leads' },
    { label: 'Opportunities', icon: <LightbulbRoundedIcon />, link: '/opportunities' },
    { label: 'Accounts', icon: <LayersRoundedIcon />, link: '/accounts' },
    { label: 'Activity', icon: <DonutSmallIcon />, link: '/activity' },
];

const SelectedListItem: React.FC = () => {
    const [currentPath, setCurrentPath] = useState('');

    useEffect(() => {
        setCurrentPath(window.location.pathname);
    }, []);


    const handleListItemClick = (link: string): void => {
        setCurrentPath(link);
    };

    return (
        <Box className="text-color" sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <List component="nav" aria-label="main mailbox folders" sx={{ marginTop: '20px' }}>
                {listItems.map((item:ListItemData) => (
                    <ListItemButton
                        key={item.label}
                        onClick={() => handleListItemClick(item.link)}
                        sx={{
                            color: currentPath === item.link ? '#3F8CFF' : 'gray',
                            backgroundColor: currentPath === item.link ? 'rgba(63,140,255,.1)' : 'transparent',
                            borderRight: currentPath === item.link ? '5px solid #3F8CFF' : '',
                            borderRadius: currentPath === item.link ? '2px' : '',
                            '&:hover': {
                                backgroundColor: 'lightblue',
                            },
                        }}
                    >
                        <ListItemIcon>
                            {React.cloneElement(item.icon, {
                                sx: { color: currentPath === item.link ? '#3F8CFF' : 'gray' },
                            })}
                        </ListItemIcon>
                        <Link href={item.link} passHref>
                            <ListItemText primary={item.label} />
                        </Link>
                    </ListItemButton>
                ))}
            </List>
            <Divider />
        </Box>
    );
};

export default SelectedListItem;

