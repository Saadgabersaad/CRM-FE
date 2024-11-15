'use client';
import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { usePathname } from 'next/navigation';
import ApiService from "@/app/services/api.service";
import { useIDContext } from "@/app/context/customerIdProvider";
import { useCallback, useState, useMemo } from "react";

// Define interface for options
interface Option {
    label: string;
    backgroundColor: string;
    color: string;
}

// Define status options for each route
const STATUS_OPTIONS: Record<string, Option[]> = {
    '/customers': [
        { label: 'Current', backgroundColor: '#ccf0eb', color: '#00B69B' },
        { label: 'Potential', backgroundColor: '#e0d4fc', color: '#6226EF' },
    ],
    '/leads': [
        { label: 'New', backgroundColor: '#EEF5F0', color: '#589E67' },
        { label: 'Lost', backgroundColor: '#EEF5F0', color: '#589E67' },
        { label: 'Qualified', backgroundColor: '#F7F7E8', color: '#B1AB1D' },
        { label: 'Contacted', backgroundColor: '#F4EDF7', color: '#954BAF' },
    ],
    '/accounts': [
        { label: 'Active', backgroundColor: '#ccf0eb', color: '#00B69B' },
        { label: 'Inactive', backgroundColor: '#e0d4fc', color: '#EF3826' },
    ],
};

// Props interface
interface StatusMenuProps {
    initialStatus: string;
    initialState: string;
    accStatus: string;
}

// Helper to get options based on pathname
const getOptions = (pathname: string): Option[] => STATUS_OPTIONS[pathname] || [];

// Main component
export default function StatusMenu({ initialStatus, initialState, accStatus }: StatusMenuProps) {
    const { selectedId } = useIDContext();
    const pathname = usePathname();
    const options = useMemo(() => getOptions(pathname), [pathname]);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedValue, setSelectedValue] = useState(
        pathname === '/customers' ? initialStatus :
            pathname === '/leads' ? initialState : accStatus
    );

    const open = Boolean(anchorEl);

    const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = async (event: React.MouseEvent<HTMLElement>, index: number) => {
        const newValue = options[index].label.toLowerCase();
        if (newValue !== selectedValue) {
            setSelectedValue(newValue);
            await updateStatus(newValue);
        }
        setAnchorEl(null);
    };

    const updateStatus = useCallback(
        async (newValue: string) => {
            try {
                if (pathname === '/customers') {
                    await ApiService.updateCustomerStatus(selectedId, { status: newValue });
                } else if (pathname === '/leads') {
                    await ApiService.updateLeadStatus(selectedId, { status: newValue });
                } else if (pathname === '/accounts') {
                    await ApiService.updateAccountStatus(selectedId, { status: newValue });
                }
                console.log('Status updated successfully:', newValue);
            } catch (error) {
                console.error('Failed to update status:', error);
            }
        },
        [selectedId, pathname]
    );

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <List
                sx={{ display: 'flex', justifyContent: 'center' }}
                disablePadding
                component="nav"
                aria-label="Status menu"
            >
                <ListItemButton
                    id="lock-button"
                    aria-haspopup="listbox"
                    aria-controls="lock-menu"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClickListItem}
                    sx={{
                        width: 'fit-content',
                        borderRadius: '5px',
                        padding: '8px',
                        backgroundColor: options.find(o => o.label.toLowerCase() === selectedValue)?.backgroundColor,
                        color: options.find(o => o.label.toLowerCase() === selectedValue)?.color,
                    }}
                >
                    <ListItemText
                        sx={{
                            fontSize: '12px',
                            margin: 0,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        primary={selectedValue}
                    />
                </ListItemButton>
            </List>
            <Menu
                anchorOrigin={{ vertical: 'center', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                id="lock-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'lock-button',
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
                            borderRadius: '5px',
                            margin: '10px',
                            backgroundColor: option.backgroundColor,
                            color: option.color,
                            fontWeight: 'bold',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        selected={option.label.toLowerCase() === selectedValue}
                        onClick={(event) => handleMenuItemClick(event, index)}
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
