import React from 'react'
import {Paperclip} from "lucide-react";

const AddLogo = () => {
    return (
        <div className="row-between w-[34%] font-bold  gap-14  ms-2">
            <h2 className='text-primary  text-[20px] '>
                Add Company logo</h2>

               <input
               className=''
               id='file-input'
               style={{ display: "none" }}
               type="file"
              />
             <label className=' row-between  btn px-2 py-4 gap-3  rounded border-spacing-4  text-gray-500 border-2 border-blue-400 border- border-dashed btn-primary' htmlFor="file-input">
                 <Paperclip size='24px' className='text-primary'/>
                 <span>Add Logo</span></label>


        </div>
    )
}
export default AddLogo
