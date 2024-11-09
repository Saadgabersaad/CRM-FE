
import * as React from 'react';
import Button from '@mui/material/Button';
import { RotateCcw } from 'lucide-react';


export default function ResetFilter({onReset}:{onReset:any}) {

    const handleClick = () => {
        console.info(`You clicked `);
        onReset()

    };

    return (
        <React.Fragment>

            <Button
                size="small"
                style={{color:'#EA0234',fontWeight:'bold'}}
                onClick={handleClick}
            >

                <RotateCcw  size='18px'    style={{color:'#EA0234',marginRight:"10px"}} />

                Reset Filters

            </Button>

        </React.Fragment>
    );
}