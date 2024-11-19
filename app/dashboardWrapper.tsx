'use client'
import React from 'react'
import MiniDrawer from "./_Components/Drawer/index";
import Header from "@/app/_Components/header/header";
import {Nunito} from 'next/font/google'
import {NextFont} from "next/dist/compiled/@next/font";
import {IDProvider} from "@/app/context/customerIdProvider";
import { ViewProvider } from "@/app/context/toggleContext";


const _Nunito:NextFont =  Nunito({
    subsets:["latin"],
    style:["normal"]

});
const DashboardLayout = ({children}: {children: React.ReactNode}) => {

    return (
        <IDProvider>

            {/*<CustomerContextProvider>*/}
                <ViewProvider>

                <div  style={{fontFamily:_Nunito.style.fontFamily}}
                      className='flex min-h-screen  mx-auto w-[96%] text-gray-950'>
                    {/* SideBar */}

                    <MiniDrawer/>
                    <main className={`flex w-full flex-col mt-12 gap-5 justify-start items-center`} >

                        <Header/>

                        {children}

                    </main>
                </div>
                </ViewProvider>

            {/*</CustomerContextProvider>*/}

        </IDProvider>
    )
}


export default DashboardLayout
