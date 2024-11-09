
import * as React from 'react';
import {usePathname, useRouter} from 'next/navigation';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import {useContext} from "react";
import {CustomerContext} from "@/app/context/CustomerContextProvider";

export default function BasicButtons() {
    const {setCustomer} = useContext(CustomerContext)



    const router = useRouter();
    const pathname =usePathname()


    const handleClick = () => {
        if ( pathname ==='/customers') {
            router.push('/customers/add-customer');
            setCustomer(false);
        }
        if ( pathname ==='/customers/profile') {
            router.push('/customers/add-customer');
            setCustomer(false);
        }
        if (pathname === '/leads') {
            router.push('/leads/add-lead');
        }

        if (pathname === '/accounts') {
            router.push('/accounts/add-account');
        }
    };
    if (setCustomer===true) {
        return <div className='loader'></div>
    }
    return (
        <div className='flex flex-col gap-5 items-end justify-between'>

            <Stack   spacing={2} direction="row">
                <Button style={{height:'48px',fontWeight:'bold' }}  variant="outlined"><CloudDownloadOutlinedIcon style={{marginRight:'10px'}}/>DownLoad</Button>
                <Button style={{height:'48px',fontWeight:'bold' }}  variant="outlined"><CloudUploadOutlinedIcon style={{marginRight:'10px'}}/> Import</Button>
                <Button
                    className='mainBackgroundColor'
                    onClick={handleClick}
                    style={{height:'48px',fontWeight:'bold' }}
                    variant="contained">
                    <AddIcon style={{marginRight:'10px '}}/>
                    {pathname==='/customers'&&'Add Customer'}
                    {pathname==='/customers/profile'&&'Add Customer'}
                    {pathname==='/leads'&&'Add New Lead'}
                    {pathname==='/accounts'&&'Add Accounts'}

                </Button>
            </Stack>
        </div>
    );
}