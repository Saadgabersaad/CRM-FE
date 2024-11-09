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
import {useIDContext} from "@/app/context/customerIdProvider";
import {useFormik} from "formik";
import {useCallback, useEffect} from "react";



interface Option {
    label: string;
    backgroundColor: string;
    color: string;
}

const statusOptions: Option[] = [
    { label: 'Current', backgroundColor: '#ccf0eb', color: '#00B69B' },
    { label: 'Potential', backgroundColor: '#e0d4fc', color: '#6226EF' },
];

const stateOptions: Option[] = [
    { label: 'New', backgroundColor: '#EEF5F0', color: '#589E67' },
    { label: 'Lost', backgroundColor: '#EEF5F0', color: '#589E67' },
    { label: 'Qualified', backgroundColor: '#F7F7E8', color: '#B1AB1D' },
    { label: 'Contacted', backgroundColor: '#F4EDF7', color: '#954BAF' },
];

interface StatusMenuProps {
    initialStatus: string;
    initialState: string;
}

const getBackgroundColor = (label: string, pathname: string) => {
    const options = pathname === '/customers' ? statusOptions : stateOptions;
    return options.find(opt => opt.label.toLowerCase() === label.toLowerCase())?.backgroundColor;
};

const getColor = (label: string, pathname: string) => {
    const options = pathname === '/customers' ? statusOptions : stateOptions;
    return options.find(opt => opt.label.toLowerCase() === label.toLowerCase())?.color;
};

export default function StatusMenu({ initialStatus, initialState }: StatusMenuProps) {
    const { selectedId } = useIDContext();
    const pathname = usePathname();
    const options = React.useMemo(() => pathname === '/customers' ? statusOptions : stateOptions, [pathname]);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [selectedStatus, setSelectedStatus] = React.useState(initialStatus);
    const [selectedState, setSelectedState] = React.useState(initialState);

    const open = Boolean(anchorEl);

    const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (event: React.MouseEvent<HTMLElement>, index: number) => {
        const selectedOption = options[index];
      if (pathname === '/customers'){
               setSelectedStatus(selectedOption.label.toLowerCase())
      }
           else setSelectedState(selectedOption.label.toLowerCase());

        setSelectedIndex(index);
        setAnchorEl(null);
    };

    const updateStatus = useCallback(async () => {
        const newStatus = pathname === '/customers' ? selectedStatus : selectedState;
        try {
            await ApiService.updateCustomerStatus(selectedId, { status: newStatus });
            console.log('Status updated successfully:', newStatus);
        } catch (error) {
            console.error('Failed to update status:', error);
        }
    }, [selectedId, pathname, selectedStatus, selectedState]);

    const formik = useFormik({
        initialValues: {
            name: '',
            company_name: '',
            address: '',
            phone: '',
            email: '',
            country: '',
            status: '',
            type: ''
        },
        onSubmit: async (values) => {
            try {
                console.log('Edited values:', values);
                await ApiService.editCustomer(selectedId, values);
            } catch (error) {
                console.error('Failed to edit customer:', error);
            }
        },
    });


    // TODO: move it to a regular function
    // call it onChange()
    // and use the update-request
    useEffect(() => {
        const fetchCustomerData = async () => {
            try {
                const response = await ApiService.getCustomerById(selectedId);
                const customerData = response.data.data;

                if (customerData) {
                    formik.setValues(customerData);
                    if (selectedStatus !== initialStatus || selectedState !== initialState) {
                        await updateStatus();
                    }
                }
            } catch (error) {
                console.error('Failed to fetch customer data:', error);
            }
        };

        // if (selectedId) fetchCustomerData();

        return () => setAnchorEl(null); // Cleanup anchor element on unmount
    }, [selectedId, selectedStatus, selectedState, initialStatus, initialState, updateStatus]);



    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <List disablePadding component="nav" aria-label="Status menu">
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
                        backgroundColor: getBackgroundColor(pathname === '/customers' ? selectedStatus : selectedState, pathname),
                        color: getColor(pathname === '/customers' ? selectedStatus : selectedState, pathname),
                    }}
                >
                    <ListItemText
                        sx={{ fontSize: '12px', margin: 0 }}
                        primary={pathname === '/customers' ? selectedStatus : selectedState}
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
                            fontWeight: 'bold'
                        }}
                        selected={index === selectedIndex}
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
