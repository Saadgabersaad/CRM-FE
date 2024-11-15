

'use client';

import React from 'react';
import Typography from '@mui/material/Typography';
import BasicButtons from '@/app/_Components/header/buttonDrower';
import ProfileStatus from '@/app/_Components/profileStatus/profileStatus';
import Back from '@/app/_Components/header/back';
import { usePathname } from 'next/navigation';

const pageTitles: { [key: string]: string } = {
    '/customers': 'Customers',
    '/customers/add-customer': 'Add Customer',
    '/customers/edit-customer': 'Edit Customers',
    '/customers/profile': 'Company Name',
    '/leads': 'Leads',
    '/leads/edit-lead': 'Edit Lead',
    '/leads/add-lead': 'Add Lead',
    '/accounts': 'Accounts',
    '/accounts/edit-account': 'Edit Account',
    '/accounts/add-account': 'Add Account',
};

const Header: React.FC = () => {
    const pathname = usePathname();

    const showBackButton = ['/customers/add-customer', '/customers/edit-customer', '/customers/profile','/leads/edit-lead','/leads/add-lead','/accounts/add-account','/accounts/edit-account'].includes(pathname);
    const showButtonDrawer = ['/customers', '/customers/profile', '/leads','/accounts'].includes(pathname);

    return (
        <div className="w-full flex flex-col gap-5 z-50">
            {showBackButton && (

                <Back />

            )}

            <div className="flex justify-between items-start">
                <div className="flex flex-col">
                    {pageTitles[pathname] && (
                        <Typography
                            className="mainColor"
                            sx={{ fontSize: '36px', fontWeight: 'bold' }}
                            variant="h2"
                            noWrap
                        >
                            {pageTitles[pathname]}
                        </Typography>
                    )}

                    {pathname === '/customers/profile' && <ProfileStatus />}
                </div>

                {showButtonDrawer && <BasicButtons />}
            </div>
        </div>
    );
};

export default Header;

