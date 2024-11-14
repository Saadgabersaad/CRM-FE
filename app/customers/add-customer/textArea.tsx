import * as React from 'react';
import Box from '@mui/joy/Box';
import Textarea from '@mui/joy/Textarea';
import Typography from '@mui/joy/Typography';
import {usePathname, useRouter} from "next/navigation";
import Button from "@mui/joy/Button";
import ApiService from "@/app/services/api.service";

export default function TextareaDecorators({id}: { id:number|null }) {
const router = useRouter()

    async function addComment(value:string,id:number|null) {
        await ApiService.addComment(value,id);
        router.back()
    }


    const [text, setText] = React.useState('');
    const pathname = usePathname()




    function getContainerClass(pathname: string): string {
        switch (pathname) {
            case "/customers/edit-customer":
                return "w-3/5 ms-2";

            case "/customers/add-customer":
                return " ms-2";

            case "/leads/add-lead":
                return "ms-2";

            case "/customers/profile":
                return "w-2/3";

            default:
                return "";
        }
    }
    return (
        <div className={`${getContainerClass(pathname)} mb-2.5`}>
            <span className='text-color font-ui'>Additional information / Notes</span>
            <Textarea

                placeholder="Type in here…"
                value={text}
                onChange={(event) => setText(event.target.value)}
                minRows={4}

                startDecorator={
                    <Box sx={{display: 'flex', gap: 0.5, flex: 1}}>


                    </Box>
                }
                endDecorator={
                    <Typography level="body-xs" sx={{ml: 'auto'}}>
                        {text.length} character(s)
                    </Typography>
                }
                sx={{minWidth: 300}}
            />
            <span className='text-color mt-1'> Maximum 500 characters</span>

            {pathname === '/customers/profile'? <div className='flex items-center w-fit justify-start mt-2.5 gap-5'>
                <Button className='py-3 px-6 font-bold' variant="outlined">Cancel</Button>
                <input type='submit'
                       onClick={() => addComment(text, id)}
                       className='mainBackgroundColor font-bold text-white cursor-pointer rounded py-3 px-6'
                       value='Submit'/>
            </div>:null}
        </div>
    );
}
