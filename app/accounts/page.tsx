'use client'

import React from 'react';
import {useView} from '@/app/context/toggleContext';
import AccountMainView from "@/app/_Components/accounts/accountMainView/accountMainView";
import AccountSecView from "@/app/_Components/accounts/accountSecView/accountSecView";

const Page = () => {
    const { view } = useView();

    return (view == 'viewOne' ? <AccountSecView/>  :  <AccountMainView />);
}

export default Page;
