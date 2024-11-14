import React from 'react'
import {ChevronLeft, SquareArrowOutUpRight} from "lucide-react";
import {usePathname, useRouter} from 'next/navigation';



const Back = () => {

    const pathname=usePathname()


    const router = useRouter()
    const handleBackClick = () => {
        router.back();
    };

    return (
        <div className='rows-between  w-full z-50'>


            <button
                className='z-50 mainColor flex items-center font-bold justify-end gap-2'
                onClick={handleBackClick}>
                <ChevronLeft strokeWidth='3' size='15px'/>
                Back
            </button>

            {pathname==="/customers/profile" &&
                <button className='z-50 mainColor flex items-center font-bold justify-end gap-2'>
                    Edit
                    <SquareArrowOutUpRight size={20}/>
                </button>}
        </div>
    )
}
export default Back
