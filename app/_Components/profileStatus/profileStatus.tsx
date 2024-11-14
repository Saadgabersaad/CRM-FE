import React, {useEffect, useState} from 'react'
import {useIDContext} from "@/app/context/customerIdProvider";
import ApiService from "@/app/services/api.service";

const ProfileStatus = () => {

    type ProfileData = {
        type: string;
        status: string;
        last_contacted: string;
        // Add other fields as needed
    };
    const {selectedId}=useIDContext()
    const [profileData, setProfileData] = useState<ProfileData | null>(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchDataById=  async()=>{

            try {
                const response=    await ApiService.getCustomerById(selectedId);
                const data = response.data.data
                setProfileData(data);
            }
            catch (error) {
                console.error('Failed to fetch customers:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchDataById()
    }, [selectedId]);




    if (loading) return <div className='loader'></div>;


    return (
        <div className="w-fit flex text-xs flex-col gap-2 items-center justify-center ">

            <div ><p>Last Contacted : {profileData?.last_contacted} </p></div>

            <div className='flex items-center justify-center gap-2'>
            <div className='w-fit rounded px-4 p-1.5 bg-amber-200 text-amber-800'>{profileData?.type}</div>
            <div className='w-fit rounded px-4 p-1.5 bg-blue-100 text-blue-600'>{profileData?.status}</div>

            </div>

        </div>
    )
}
export default ProfileStatus
