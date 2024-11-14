'use client'
import React, { useEffect, useState} from 'react'
import {useIDContext} from "@/app/context/customerIdProvider";
import {useRouter} from "next/navigation";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import AddImageBtn from "@/app/customers/add-customer/addImage";
import ApiService from "@/app/services/api.service";
import {useFormik} from "formik";
import Button from "@mui/joy/Button";
import TextareaDecorators from "@/app/customers/add-customer/textArea";


const EditCustomer = () => {

    const { selectedId } = useIDContext();
    const [loading, setLoading] = useState(true);
    const router = useRouter()


    const handleBackClick = () => {
        router.back();
    };


    const formik  =  useFormik({
        initialValues:{
            name:'',
            company_name:'',
            address:'',
            phone:'',
            email:'',
            country:'',
            status:'',
            type:''
        },
        onSubmit:async (values) => {
            try {
                console.log('Edited values:', values);
                await ApiService.editCustomer(selectedId, values);
                router.back();
            } catch (error) {
                console.error('Failed to edit customer:', error);
            }
        },
    });


    useEffect(() => {
        const fetchCustomerData = async () => {
            try {
                const response = await ApiService.getCustomerById(selectedId);
                const customerData = response.data.data;

                if (customerData) {
                    formik.setValues(customerData);
                }
            } catch (error) {
                console.error('Failed to fetch customer data:', error);
            } finally {
                setLoading(false);
            }
        };

        if (selectedId) fetchCustomerData()

    }, [ selectedId]);

    if (loading) return <div className='loader'></div>;

    return (
        <div className='tertiary-color pt-7 pb-7 mb-12 w-full rounded-md'>
            <div className='ms-5 me-5'>
                <div>  <AddImageBtn/></div>

                <form onSubmit={formik.handleSubmit}>
                    <div className='flex flex-col gap-10'>
                        <div className='flex items-start flex-shrink gap-5 flex-wrap mt-5 '>
                            <div className='w-1/5 mb-5    '>

                                <FormControl fullWidth sx={{m: 1}}>
                                    <InputLabel htmlFor="name">Contact Name</InputLabel>
                                    <OutlinedInput

                                        sx={{backgroundColor: 'white'}}
                                        placeholder='Add Contact Name'
                                        id="name"
                                        label="Contact Name"
                                        name="name"
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                </FormControl>
                            </div>
                            <div className='w-1/5 mb-5 '>
                                <FormControl fullWidth sx={{m: 1}}>
                                    <InputLabel htmlFor="email">Contact Email</InputLabel>
                                    <OutlinedInput
                                        placeholder='Add contact email'
                                        sx={{backgroundColor: 'white'}}
                                        id="email"
                                        label="Contact Email"
                                        name="email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        type='email'
                                    />

                                </FormControl>
                            </div>
                            <div className='w-1/5 mb-5 '>
                                <FormControl fullWidth sx={{m: 1}}>
                                    <InputLabel htmlFor="phone">Contact Phone number </InputLabel>
                                    <OutlinedInput
                                        placeholder='phone'
                                        sx={{backgroundColor: 'white'}}
                                        id="phone"
                                        label="Contact Phone number"
                                        name='phone'
                                        value={formik.values.phone}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        type='phone'
                                    />
                                </FormControl>
                            </div>
                            <div className='w-1/5 mb-5 '>
                                <FormControl fullWidth sx={{m: 1}}>
                                    <InputLabel htmlFor="company-name">Contact Position</InputLabel>
                                    <OutlinedInput
                                        sx={{backgroundColor: 'white'}}
                                        placeholder='Contact Position'
                                        id="Contact-Position"
                                        label="Contact-Position"
                                        name="Contact-Position"
                                        value={formik.values.company_name}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                </FormControl>
                            </div>

                            {/*TODO Language endpoint Api*/}
                            {/*<div className='w-1/5 mb-5'>*/}
                            {/*    <FormControl*/}
                            {/*        disabled*/}
                            {/*        fullWidth sx={{m: 1}}>*/}
                            {/*        <InputLabel htmlFor="address">Languages</InputLabel>*/}
                            {/*        <OutlinedInput*/}
                            {/*            placeholder='Languages'*/}
                            {/*            sx={{backgroundColor: 'white'}}*/}
                            {/*            id="Languages"*/}
                            {/*            label="Languages"*/}
                            {/*            name="Languages"*/}
                            {/*            value={formik.values.languages}*/}
                            {/*            onChange={formik.handleChange}*/}
                            {/*            onBlur={formik.handleBlur}*/}
                            {/*        />*/}
                            {/*    </FormControl>*/}
                            {/*</div>*/}


                        </div>
                        <div><AddImageBtn/></div>
                        {/*TODO Edit customer logo and gap and padding*/}

                        <div className='flex items-start gap-5 flex-wrap mt-5 '>


                            <div className='w-1/4 mb-5 '>
                                <FormControl fullWidth sx={{m: 1}}>
                                    <InputLabel htmlFor="company-name">Company Name</InputLabel>
                                    <OutlinedInput
                                        sx={{backgroundColor: 'white'}}
                                        placeholder=' Add company name'
                                        id="company-name"
                                        label="Company Name"
                                        name="company_name"
                                        value={formik.values.company_name}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                </FormControl>
                            </div>

                            <div className='w-1/4 mb-5'>
                                <FormControl fullWidth sx={{m: 1}}>
                                    <InputLabel htmlFor="countery">Country</InputLabel>
                                    <OutlinedInput
                                        placeholder='Add company address'
                                        sx={{backgroundColor: 'white'}}
                                        id="countery"
                                        label="Address"
                                        name="country"
                                        value={formik.values.country}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                </FormControl>
                            </div>

                            <div className='w-1/4 mb-5'>
                                <FormControl fullWidth sx={{m: 1}}>
                                    <InputLabel htmlFor="address">Address</InputLabel>
                                    <OutlinedInput
                                        placeholder='Add company  address '
                                        sx={{backgroundColor: 'white'}}
                                        id="address"
                                        label="Address"
                                        name="address"
                                        value={formik.values.address}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                </FormControl>
                            </div>

                            <div className='w-1/4 mb-5 mt-2  ms-2'>
                                <Autocomplete
                                    value={formik.values.status}
                                    onChange={(event, value) => formik.setFieldValue("status", value)}
                                    onBlur={formik.handleBlur}
                                    sx={{backgroundColor: 'white',}}
                                    options={['potential', 'current']}
                                    renderInput={(params) =>
                                        (<TextField {...params} name={'status'}
                                                    label="Status"/>)}
                                />
                            </div>
                            <div className='w-1/4 mb-5 mt-2 '>
                                <Autocomplete
                                    value={formik.values.type}
                                    onChange={(event, value) => formik.setFieldValue("type", value)}
                                    onBlur={formik.handleBlur}
                                    sx={{backgroundColor: 'white'}}
                                    options={['Technical Support', 'Customer Service', '(Lcp)', 'Sales']}
                                    renderInput={(params) =>
                                        (<TextField {...params} name='type' label='Type Of Client'/>)}
                                />

                            </div>

                        </div>
                        <TextareaDecorators  id={selectedId}/>
                        <div className='flex items-center justify-end gap-5'>
                            <Button className='py-3 px-6' variant="outlined" onClick={handleBackClick}>Cancel</Button>
                            <input type='submit' className='mainBackgroundColor font-sans text-white cursor-pointer rounded py-3 px-6'
                                   value='Edit Customer'/>
                        </div>
                    </div>




                </form>
            </div>

            <div>

            </div>


        </div>
    )
}
export default EditCustomer
