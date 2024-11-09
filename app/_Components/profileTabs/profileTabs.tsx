import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import CollapsibleTable from "@/app/_Components/profileTabs/accountRows";
import TextareaDecorators from "@/app/customers/add-customer/textArea";



interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


export default function BasicTabs({data,defaultTab,id}:{data:any,defaultTab:any,id:number|null}) {


    const [value, setValue] = React.useState(defaultTab);
    console.log(data)
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{width: '100%'}}>
            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Company Details" {...a11yProps(0)} />
                    <Tab label="Accounts" {...a11yProps(1)} />
                    <Tab label="Notes / Comments" {...a11yProps(2)} />

                </Tabs>
            </Box>

            <CustomTabPanel  value={value} index={0}>
                <div className='flex flex-col gap-5 border-b pb-8'>
                    <div className='flex flex-wrap gap-y-4 w-2/3'>
                        <div className=' w-1/2'>
                            <Typography
                                className='text-color '
                                variant="subtitle1" noWrap component="div"
                            >
                                Company Name
                            </Typography>
                            <Typography
                                className=' font-bold '
                                variant="subtitle1" noWrap component="div"
                            >
                                {data?.company_name}
                            </Typography>

                        </div>
                        <div className=' w-1/2'>
                            <Typography
                                className='text-color '
                                variant="subtitle1" noWrap component="div"
                            >
                                Country
                            </Typography>
                            <Typography
                                className=' font-bold '
                                variant="subtitle1" noWrap component="div"
                            >
                                USA
                            </Typography>

                        </div>
                        <div className=' w-1/2'>
                            <Typography
                                className='text-color '
                                variant="subtitle1" noWrap component="div"
                            >
                                Date of first contact
                            </Typography>
                            <Typography
                                className=' font-bold '
                                variant="subtitle1" noWrap component="div"
                            >
                                {data?.last_contacted}
                            </Typography>

                        </div>
                        <div className=' w-1/2'>
                            <Typography
                                className='text-color '
                                variant="subtitle1" noWrap component="div"
                            >
                                ID
                            </Typography>
                            <Typography
                                className=' font-bold '
                                variant="subtitle1" noWrap component="div"
                            >
                                {data?.id}
                            </Typography>
                        </div>


                    </div>
                    <div className='w-1/4'>
                        <h6 className='text-color font-weight-light '>
                            Address
                        </h6>
                        <h6  className='font-bold'>
                            {data?.address}
                        </h6>
                    </div>

                    <div className='flex  w-2/3 justify-between'>
                        <div className='w-1/5'>
                            <h6 className='text-color font-weight-light '>
                                Assigned
                            </h6>
                            <h6 className='font-bold'>
                                {data?.assigned_to}
                            </h6>
                        </div>

                        <div className='flex flex-col'>
                            <h6 className='text-color font-weight-light '>
                                Accounts
                            </h6>
                            <div className='flex gap-2 justify-between'>
                                <h6 className='badge'>
                                    Translation for 1
                                </h6>
                                <h6 className='badge'>
                                    Translation for 1
                                </h6>
                                <h6 className='badge'>
                                    Translation for 1
                                </h6>
                            </div>
                        </div>

                    </div>
                </div>
                <div className='w-2/3 '>
                    <h5 className='text-color py-4 '>About the Company</h5>
                    {/*<p>{data.about || "No description available"} </p>*/}
                </div>
            </CustomTabPanel>

            <CustomTabPanel value={value} index={1}>
                <CollapsibleTable/>
            </CustomTabPanel>


            <CustomTabPanel value={value} index={2}>

                <div>
                    <div className=' border-b pb-2.5 '>
                        <TextareaDecorators id={id} />

                    </div>
                    {/*TODO*/}

                    {data?.comments && data?.comments.length > 0 ?

                        (  data.comments.map((comment:any,index:number)=>{
                            console.log(comment)
                            return (

                                <div key={index} className='Back-ground-dark10 flex flex-col justify-evenly gap-2  p-3.5 rounded my-3.5 '>
                                    <div className='flex justify-between dark10'>
                                        <Typography variant='subtitle1' className='font-bold'>{comment.by}</Typography>
                                        <Typography className='text-color' variant='subtitle1'>
                                            {comment.created}

                                        </Typography>
                                    </div>
                                    <p className='dark80'>
                                        {comment.comment}
                                    </p>
                                </div>)
                        })): (
                            <Typography className='text-center p-5 font-bold text-2xl'>No comments available.</Typography>
                        )
                    }



                </div>
            </CustomTabPanel>


        </Box>
    );
}
