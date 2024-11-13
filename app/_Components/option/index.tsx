
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Divider from '@mui/material/Divider';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import ApiService from '@/app/services/api.service';
import { usePathname, useRouter } from 'next/navigation';
import {useView} from "@/app/context/toggleContext";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

const ITEM_HEIGHT = 48;

interface Option {
    label: string;
    action: string;
}

export default function LongMenu({ id,data }: { id: number,data:any }) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const router = useRouter();
    const pathname = usePathname();

    const getOptions = (pathname: string): Option[] => {
        switch (pathname) {
            case '/customers':
                return [
                    { label: 'Add Comment', action: 'addComment' },
                    { label: 'Visit Customer Profile', action: 'visitProfile' },
                    { label: 'Edit Customer', action: 'editCustomer' },
                ];
            case '/leads':
                return [
                    { label: 'Add Comment', action: 'addComment' },
                    { label: 'Edit Lead', action: 'editLead' },
                ];
            case '/accounts':
                return [
                    { label: 'Add Comment', action: 'addComment' },
                    { label: 'Edit Account', action: 'editAccount' },
                ];
            default:
                return [];
        }
    };

    const options = getOptions(pathname);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleAction = async (action: string) => {
        handleClose();

        switch (action) {
            case 'addComment':
                if (pathname==="/customers") {
                router.push("/customers/profile?tab=2");
                console.log('Add Comment:');}
                break;
            case 'visitProfile':
                router.push(`/customers/profile`);
                break;
            case 'editCustomer':
                router.push('/customers/edit-customer');
                break;

            case 'deleteCustomer':
                await handleDelete(id);
                break;

            case 'editLead':
                router.push('/leads/edit-lead');
                break;

            case 'deleteLead':
                await handleDelete(id);
                break;

            case 'editAccount':
                router.push('/accounts/edit-account');
                break;
            case 'deleteAccount':
                await handleDelete(id);
                break;
            default:
                console.warn('Unknown action:', action);
        }
    };

    const handleDelete = async (id: number) => {
        if (pathname === '/customers') {
            await ApiService.deleteCustomer(id);
            data()
        } if(pathname === '/leads') {
            await ApiService.deleteLead(id);
            data()

        }if(pathname === '/accounts') {
            await ApiService.deleteAccount(id);
            data()

        }
        handleClose();
    };
    const {view}=useView()

    return (
        <div>
            {view==="viewOne"&&

                <IconButton
                    aria-label="more"
                    id="long-button"
                    aria-controls={open ? 'long-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleClick}
                >
                    {view==="viewOne"&& <ModeCommentOutlinedIcon sx={{ marginRight: '5px', padding: '1px' }} fontSize="small"/>}
                </IconButton>

               }
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                {view==="viewOne"? <SettingsOutlinedIcon/> :<MoreVertIcon/>}
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '18ch',
                    },
                }}
            >
                {options.map((option) => (
                    <MenuItem
                        key={option.action}
                        sx={{ color: '#3F8CFF', fontSize: '12px', fontWeight: '600' }}
                        onClick={() => handleAction(option.action)}
                    >
                        {option.label === 'Add Comment' && view!=='viewOne' &&
                        (
                            <ModeCommentOutlinedIcon
                                sx={{ marginRight: '5px', padding: '1px' }}
                                fontSize="small"
                            />
                        )}
                        { option.label}
                    </MenuItem>
                ))}
                <Divider />

                <MenuItem
                    sx={{ color: 'red', fontSize: '12px' }}
                    onClick={() => handleAction('deleteCustomer')}
                >
                    <ErrorOutlineOutlinedIcon fontSize="small" />
                    Delete
                </MenuItem>
            </Menu>
        </div>
    );
}

