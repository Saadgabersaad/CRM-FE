'use client'
import React, {useEffect, useState} from 'react'
import Image from "next/image";
import Logo from "../../assets/languageLogo.png"
import { SquarePen } from 'lucide-react';
import { Mail,Smartphone,Languages } from 'lucide-react';
import Typography from "@mui/joy/Typography";
import Profile from "../../assets/beed83bf6aee26c5540858387e08bd9a.jpeg"
import BasicTabs from "@/app/_Components/profileTabs/profileTabs";
import ApiService from "@/app/services/api.service";
import {useIDContext} from "@/app/context/customerIdProvider";
import {usePathname, useRouter, useSearchParams} from "next/navigation";import { CircleAlert } from 'lucide-react';


const Page = () => {

const pathname =usePathname()

    const handleEdit= (selectedId:number|null)=>{
        router.push(`/customers/edit-customer/`);
        console.log('Visit Customer Profile:',selectedId);
    }
    type ProfileData = {
        name: string;
        company_name: string;
        email: string;
        phone: string;
        assigned_to: string;
        // Add other fields as needed
    };

    const handleDelete = async (id: number|null) => {
        if (!id) {
            console.error('No customer ID provided');
            return;
        }
        try {
            if (pathname === '/customers/profile') {
                await ApiService.deleteCustomer(id);
                router.push('/customers');
            }
            // Add logic for deleting leads if needed
        } catch (error) {
            console.error('Error deleting customer:', error);
        }


    };

    const searchParams = useSearchParams();
    const tab = searchParams.get('tab') || '0';

    const {selectedId}: {selectedId: number | null }=useIDContext()
    const [profileData, setProfileData] = useState<ProfileData | null>(null);
    const [loading, setLoading] = useState(true);

    //TODO /// save data when refresh
    useEffect(() => {
        const fetchDataById=  async()=>{

            try {

                const response = await ApiService.getCustomerById(selectedId);
                const data = response.data.data;
                setProfileData(data);
                // Check if data is already saved in localStorage
                // const savedData = localStorage.getItem(`data-${selectedId}`);
                // if (savedData) {
                //     // If data exists in localStorage, set it directly
                //     setProfileData(JSON.parse(savedData));
                // } else {
                //     // Otherwise, fetch the data from API
                //     const response = await ApiService.getCustomerById(selectedId);
                //     const data = response.data.data;
                //     setProfileData(data);
                //     // Store the fetched data in localStorage
                //     localStorage.setItem(`data-${selectedId}`, JSON.stringify(data));
                // }
            } catch (error) {
                console.error('Failed to fetch customers:', error);
            } finally {
                setLoading(false);
            }
        };

        if (selectedId) {
            fetchDataById();
        }
    }, [selectedId]);

    const router = useRouter()





    if (loading) return <div className='loader'></div>;

    return (
        <div className="flex gap-2  w-full">
            <div className="w-1/5  flex flex-col  px-5 gap-2.5 tertiary-color mb-[30px]   ">

                <div className='border-b-2 pb-4'>
                    <div className='rows w-full items-center mb-2.5  pt-7 '>
                        <div><Image src={Logo} alt="Logo" className='w-[72px] h-[72px] rounded-full overflow-clip'/></div>
                        <div>
                            <button  onClick={() => handleEdit(selectedId)} className='z-50 mainColor flex items-center justify-end gap-2'>
                                <SquarePen  size={20}/>
                            </button>
                        </div>
                    </div>

                    <div >
                        <h2 className='text-2xl font-bold mb-2 '>{profileData?.name}</h2>
                        <div className="flex text-xs  w-full items-center  ">

                            <p className=' text-color'>Product Designer at :</p> <span
                            className='font-bold'> {profileData?.company_name}
                        </span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-start dark80  justify-around gap-4 border-b-2 py-4">
                    <h2 className='text-lg font-bold text-black'>Additional Details</h2>

                    <div className="flex justify-start gap-4   w-full items-start  ">
                        <Mail/>
                        <div className='flex flex-col   w-full items-start  '>
                            <span>Email</span>
                            <Typography>
                                {profileData?.email}
                            </Typography>
                        </div>
                    </div>
                    <div className="flex justify-start gap-4   w-full items-start  ">
                        <Smartphone/>
                        <div className='flex flex-col   w-full items-start  '>
                            <span>Phone</span>
                            <Typography>
                                {profileData?.phone}
                            </Typography>
                        </div>
                    </div>
                    <div className="flex justify-start gap-4   w-full items-start   ">
                        <Languages/>
                        <div className='flex flex-col   w-full items-start  '>
                            <span>Languages</span>
                            <Typography>
                                French, English
                            </Typography>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col items-start justify-around font-bold gap-4 py-4'>
                    <h2 className='text-lg '>Assigned to</h2>
                    <div className='flex text-color w-full justify-start items-center '>
                        <Image src={Profile} alt={"Profile"} className='w-[27px] h-[27px] rounded-full z-50 ' />
                        <Typography className=' bg-[#DDEAFB] rounded-full text-xs  py-1 -translate-x-2.5  px-5 '>
                            {profileData?.assigned_to}
                        </Typography>
                    </div>
                </div>
                <div
                onClick={() => handleDelete(selectedId)}
                    className='text-red-600 row cursor-pointer  border-t pt-2 font-semibold mt-20'>
                    <CircleAlert size={18} />
                    <span>  Delete Customer</span>
                </div>
            </div>


            <div className="w-4/5  ">
                <BasicTabs id={selectedId} data={profileData}  defaultTab={parseInt(tab, 10)}/>
            </div>

        </div>
    )
}
export default Page




