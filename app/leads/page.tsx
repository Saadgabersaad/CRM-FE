'use client'

import React from 'react';
import LeadsViewOne from '../_Components/leads/leadViewOne';
import LeadsViewTwo from '../_Components/leads/leadViewTwo';
import {useView} from '@/app/context/toggleContext';

const Page = () => {
    const { view } = useView();

    return (view == 'viewOne' ? <LeadsViewOne /> : <LeadsViewTwo />);
}

export default Page;
