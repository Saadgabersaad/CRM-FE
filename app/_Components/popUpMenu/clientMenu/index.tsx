'use client';

import React, { useState, useMemo, MouseEvent } from 'react';
import { Menu, MenuItem, Divider, List, ListItemButton, ListItemText } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { usePathname } from 'next/navigation';

interface Option {
    label: string;
    backgroundColor: string;
    color: string;
}

interface StatusMenuProps {
    clientType: number;
}

const stateOptions: Option[] = [
    { id:0, label: "(Lsp)", backgroundColor: '#eef5f0', color: "#589E67" },
    { id:1,label: "Customer service", backgroundColor: '#EDF2FE', color: "#4976F4" },
    { id:2,label: "Medical", backgroundColor: '#F7F7E8', color: "#B1AB1D" },
    { id:3,label: "Sales", backgroundColor: '#F4EDF7', color: "#954BAF" },
];

const getStyles = (label: string, options: Option[]) => {
    const option = options.find(opt => opt.label.toLowerCase() === label.toLowerCase());
    return {
        backgroundColor: option?.backgroundColor,
        color: option?.color,
    };
};

export default function StatusMenu({ clientType }: StatusMenuProps) {
    const pathname = usePathname();
    const options = useMemo(() => (pathname === '/customers' ? stateOptions : []), [pathname]);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedState, setSelectedState] = useState(clientType);
    const open = Boolean(anchorEl);

    const handleClickListItem = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (index: number) => {
        setSelectedState(options[index].label);
        setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const selectedStyles = getStyles(selectedState, options);

    return (
        <div>
            <List disablePadding component="nav" aria-label="Status menu">
                <ListItemButton
                    aria-haspopup="listbox"
                    aria-controls="status-menu"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClickListItem}
                    sx={{
                        width: 'fit-content',
                        borderRadius: 1,
                        padding: 1,
                        fontSize: '12px',
                        ...selectedStyles,
                    }}
                >
                    <ListItemText primary={selectedState} sx={{ margin: 0 }} />
                </ListItemButton>
            </List>
            <Menu
                id="status-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'center', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                MenuListProps={{
                    'aria-labelledby': 'status-button',
                    role: 'listbox',
                }}
            >
                <MenuItem sx={{ color: '#3F8CFF', fontSize: '12px' }} onClick={handleClose}>
                    Change Type <KeyboardArrowDownIcon fontSize="small" />
                </MenuItem>
                <Divider />
                {options.map((option, index) => (
                    <MenuItem
                        key={option.label}
                        sx={{
                            fontSize: '14px',
                            borderRadius: 1,
                            margin: '10px',
                            fontWeight: 'bold',
                            ...getStyles(option.label, options),
                        }}
                        selected={option.label === selectedState}
                        onClick={() => handleMenuItemClick(index)}
                    >
                        {option.label}
                    </MenuItem>
                ))}
                <Divider />
                <MenuItem sx={{ color: '#3F8CFF', fontSize: '12px' }} onClick={handleClose}>
                    <AddIcon /> Add Label
                </MenuItem>
            </Menu>
        </div>
    );
}
