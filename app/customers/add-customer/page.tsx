'use client'
import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Typography from "@mui/material/Typography";
import AddImageBtn from "@/app/customers/add-customer/addImage";
import AddLogo from "@/app/customers/add-customer/addLogo";
import TextareaDecorators from "@/app/customers/add-customer/textArea";
import Button from "@mui/joy/Button";
import {useRouter} from "next/navigation";
import {useFormik} from "formik";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import ApiService from "@/app/services/api.service";


export default function AddCustomer() {

    const router = useRouter()
    const handleBackClick = () => {
        router.back();
    };

    async function handleSubmit(value: any) {
        console.log(value)
        await ApiService.postCustomers(value);
        router.back()
    }

    const formik =  useFormik({
        initialValues:{
            name:'',
            company_name:'',
            address:'',
            phone:'',
            email:'',
            country:'',
            status:'',
            type:'1',
            position:'',
            assigned_to:''
        },
        onSubmit: handleSubmit

    })



    return (

        <form
            onSubmit={formik.handleSubmit}
            className='tertiary-color px-12 py-7 rounded w-full  '
        >
            <div className='flex justify-around tertiary-color w-[75%]  mb-5 gap-6 '>
                <div className='w-full  pr-10 border-r-2 border-r-gray-300'>
                    <Typography
                        className='text-primary font-bold  ms-2   my-5'
                        variant="h5" noWrap component="div"
                    >
                        Company Details
                    </Typography>
                    <div className='w-full  mb-5 '>
                        <FormControl fullWidth sx={{m: 1}}>
                            <InputLabel htmlFor="company-name">Company Name</InputLabel>
                            <OutlinedInput

                                sx={{backgroundColor: 'white'}}
                                placeholder=' Add company name'
                                id="company-name"
                                startAdornment={<InputAdornment position="start"></InputAdornment>}
                                label="Company Name"
                                name="company_name"
                                value={formik.values.company_name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                type='text'
                            />
                        </FormControl>
                    </div>
                    <div className='w-full mb-5'>

                        <FormControl fullWidth sx={{m: 1}}>
                            <InputLabel htmlFor="address">Address </InputLabel>
                            <OutlinedInput
                                placeholder='Add company  address '
                                sx={{backgroundColor: 'white'}}
                                id="address"
                                startAdornment={<InputAdornment position="start"></InputAdornment>}
                                label="Address"
                                name="address"
                                value={formik.values.address}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                type='text'
                            />
                        </FormControl>
                    </div>
                    <div className='w-full mb-7'>

                        <FormControl fullWidth sx={{m: 1}}>
                            <InputLabel htmlFor="countery">country </InputLabel>
                            <OutlinedInput
                                placeholder='Add company address '
                                sx={{backgroundColor: 'white'}}
                                id="countery"
                                startAdornment={<InputAdornment position="start"></InputAdornment>}
                                label="Address"
                                name="country"
                                value={formik.values.country}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                type='text'
                            />
                        </FormControl>
                    </div>
                    <div className='w-full mb-8 mx-2'>
                        <Autocomplete
                            value={formik.values.status}
                            onChange={(event, value) => formik.setFieldValue("status", value)}
                            onBlur={formik.handleBlur}
                            sx={{backgroundColor: 'white'}}
                            options={['potential', 'current']}
                            renderInput={(params) => <TextField {...params} name='status' label="Status"/>}
                        />
                    </div>
                    <div className='w-full mb-5 mx-2'>
                        <Autocomplete
                            value={formik.values.type}
                            onChange={(event, value) => formik.setFieldValue("type", value)}
                            onBlur={formik.handleBlur}
                            sx={{backgroundColor: 'white'}}
                            // TODO list of type ?
                            options={['1', '2','(Lcp)','Sales']}
                            renderInput={(params) => <TextField {...params} name='type' label="Type Of Client"/>}
                        />
                    </div>
                </div>

                <div className='w-full mb-5 pr-5'>
                    <Typography
                        className='text-primary font-bold my-5  ms-2  '
                        variant="h5" noWrap component="div"
                    >
                        Contact Details
                    </Typography>

                    <div className='w-full mb-5'>


                        <FormControl fullWidth sx={{m: 1}}>
                            <InputLabel htmlFor="Contact-Name">Contact Name</InputLabel>
                            {/*<label>Contact Email</label>*/}
                            <OutlinedInput
                                sx={{backgroundColor:'white'}}
                                placeholder='Add Contact Name'
                                id="Contact-Name"
                                startAdornment={<InputAdornment position="start"></InputAdornment>}
                                label="Contact Name"
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                type='text'
                            />

                        </FormControl >
                    </div>

                    <div className='w-full mb-5'>
                        <FormControl fullWidth sx={{m: 1}}>
                            <InputLabel htmlFor="email">Contact Email</InputLabel>
                            <OutlinedInput
                                placeholder='Add contact email'
                                sx={{backgroundColor:'white'}}
                                id="email"
                                startAdornment={<InputAdornment position="start"></InputAdornment>}
                                label="Contact Email"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                type='email'
                            />
                        </FormControl>
                    </div>
                    <div className='w-full mb-5'>


                        <FormControl fullWidth sx={{m: 1}}>
                            <InputLabel htmlFor="Contact-Phone-number">Contact Phone number </InputLabel>
                            <OutlinedInput
                                placeholder='phone'
                                sx={{backgroundColor:'white'}}
                                id="Contact-Phone-number"
                                startAdornment={<InputAdornment position="start"></InputAdornment>}
                                label="Contact Phone number"
                                name='phone'
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                type='phone'
                            />
                        </FormControl>
                    </div>

                    <div className='w-full mb-4'>
                        <FormControl fullWidth sx={{m: 1}}>
                            <InputLabel htmlFor="Contact-Position">Contact Position</InputLabel>
                            <OutlinedInput
                                placeholder='Contact Position'
                                sx={{backgroundColor:'white'}}
                                id="Contact-Position"
                                startAdornment={<InputAdornment position="start"></InputAdornment>}
                                label="Contact Position"
                                name='position'
                                value={formik.values.position}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                type='text'
                            />
                        </FormControl>
                    </div>
      <div className='w-full mb-4'>
                            <FormControl fullWidth sx={{m: 1}}>
                                <InputLabel htmlFor="assigned-to">Assigned To</InputLabel>
                                <OutlinedInput
                                    placeholder='Assigned To'
                                    sx={{backgroundColor:'white'}}
                                    id="assigned-to"
                                    startAdornment={<InputAdornment position="start"></InputAdornment>}
                                    label="assigned to"
                                    name='assigned_to'
                                    value={formik.values.assigned_to}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    type='text'
                                />
                            </FormControl>
                        </div>


                    <AddImageBtn/>
                </div>
            </div>

            <AddLogo/>

            <TextareaDecorators  id={null}/>
            <div className='flex items-center justify-end gap-5'>
                <Button  className='py-3 px-6' variant="outlined" onClick={handleBackClick}>Cancel</Button>
                <input  type='submit' className='mainBackgroundColor text-white cursor-pointer rounded py-3 px-6'  value='Add Customer' />
            </div>
        </form>

    );
}




