    'use client';
    import React, { useEffect, useState } from 'react';
    import {
        OutlinedInput, InputLabel,InputAdornment, FormControl,
        TextField, Autocomplete,
    } from '@mui/material';
    import AddImageBtn from '@/app/customers/add-customer/addImage';
    import TextareaDecorators from '@/app/customers/add-customer/textArea';
    import Button from '@mui/joy/Button';
    import { useRouter } from 'next/navigation';
    import { useFormik } from 'formik';
    import ApiService from '@/app/services/api.service';
    import AddAccounts from "@/app/_Components/accounts/addAccount";

    export default function Accounts({ mode, selectedId }:{mode:string,selectedId:number}) {
        const router = useRouter();
        const [loading, setLoading] = useState(mode === 'edit'); // Only show loader if editing
        const [contacts, setContacts] = useState([]);

        const formik = useFormik({
            initialValues: {
                name: '',
                annual_revenue: '',
                industry: '',
                status: '',
                assigned_to:'',
                comment:'',
                contacts: [{
                    name:'',
                    email:'',
                    phone:'',
                    position:''
                }]
            },
            onSubmit: async (values) => handleSubmit(values),
        });

        // Handle form submission
        async function handleSubmit(values:any) {
            try {
                if (mode === 'edit' && selectedId) {
                    await ApiService.editAccount(selectedId, values);
                } else {
                    await ApiService.postAccounts(values);
                }
                router.replace('/accounts'); // Redirect to leads page after submission
            } catch (error) {
                console.error('Failed to submit data:', error);
            }
        }

        // Fetch lead data if in edit mode
        useEffect(() => {
            if (mode === 'edit' && selectedId) {
                const fetchAccountData = async () => {
                    try {
                        const response = await ApiService.getAccountById(selectedId);
                        const accountData = response.data.data;
                        setContacts( accountData.contacts);
                        if (accountData) formik.setValues(accountData);
                    } catch (error) {
                        console.error('Failed to fetch lead data:', error);
                    } finally {
                        setLoading(false);
                    }
                };
                fetchAccountData();
            }
        }, [mode, selectedId]);



        const handleBackClick = () => router.back();

        if (loading) return <div className="loader"></div>;

        return (

            <>


        <form
            className='w-full'
            onSubmit={formik.handleSubmit}
        >

            <div className='  flex flex-col tertiary-color  gap-5 py-7 rounded w-full '>
                <AddImageBtn/>

                <div className='flex justify-around tertiary-color my-5 gap-6'>
                    <div className='w-full row'>
                        <div className='w-1/5 mb-5'>
                            <FormControl fullWidth sx={{m: 1}}>
                                <InputLabel htmlFor="contact-name">Contact Name</InputLabel>
                                <OutlinedInput
                                    sx={{backgroundColor: 'white'}}
                                    placeholder='Contact Name'
                                    id="contact-name"
                                    label="contact-name"
                                    name="contacts[0].name"
                                    value={formik.values.contacts[0]?.name || ''}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    type='text'
                                />
                            </FormControl>
                        </div>

                        <div className='w-1/5 mb-5'>
                            <FormControl fullWidth sx={{m: 1}}>
                                <InputLabel htmlFor="contact-position">Contact Position</InputLabel>
                                <OutlinedInput
                                    placeholder='Contact Position'
                                    sx={{backgroundColor: 'white'}}
                                    id="contact-position"
                                    label="Contact Position"
                                    name="contacts[0].position"
                                    value={formik.values.contacts[0]?.position || ''}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    type='text'
                                />
                            </FormControl>
                        </div>

                        <div className='w-1/5 mb-5'>
                            <FormControl fullWidth sx={{m: 1}}>
                                <InputLabel htmlFor="email">Contact Email</InputLabel>
                                <OutlinedInput
                                    placeholder='Add Contact Email'
                                    sx={{backgroundColor: 'white'}}
                                    id="email"
                                    label="Contact Email"
                                    name="contacts[0].email"
                                    value={formik.values.contacts[0]?.email || ''}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    type='email'
                                />
                            </FormControl>
                        </div>

                        <div className='w-1/5 mb-5'>
                            <FormControl fullWidth sx={{m: 1}}>
                                <InputLabel htmlFor="contact-phone">Contact Phone Number</InputLabel>
                                <OutlinedInput
                                    placeholder='Contact Phone Number'
                                    sx={{backgroundColor: 'white'}}
                                    id="contact-phone"
                                    label="Contact Phone Number"
                                    name="contacts[0].phone"
                                    value={formik.values.contacts[0]?.phone || ''}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    type='text'
                                />
                            </FormControl>
                        </div>
                    </div>
                </div>


                <div className='flex items-center justify-end gap-5'>

                    <input type='submit'
                           className={`${selectedId ? 'btn-danger' : 'btn-main'}`}
                           value={selectedId ? 'Remove Account' : 'Add Additional Account'}/>
                </div>

            </div>

            <div className='flex flex-col justify-around tertiary-color px-5 py-7 rounded   my-5 gap-6 '>
                <AddImageBtn/>


                <div className='w-full flex flex-col  pr-10'>
                    <div className='w-full row  '>
                        <div className='w-1/5   mb-5 '>
                            <FormControl fullWidth sx={{m: 1}}>
                                <InputLabel htmlFor="company-name">Company Name</InputLabel>
                                <OutlinedInput

                                    sx={{backgroundColor: 'white'}}
                                    placeholder='Add company Name'
                                    id="company-name"
                                    startAdornment={<InputAdornment position="start"></InputAdornment>}
                                    label="company_name"
                                    name="name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    type='text'
                                />
                            </FormControl>
                        </div>

                        <div className='w-1/5 mb-5'>
                            <FormControl fullWidth sx={{m: 1}}>
                                <InputLabel htmlFor="email">Revenue </InputLabel>
                                <OutlinedInput
                                    placeholder='Add Revenue'
                                    sx={{backgroundColor: 'white'}}
                                    id="annual_revenue"
                                    startAdornment={<InputAdornment position="start"></InputAdornment>}
                                    label="Revenue"
                                    name="annual_revenue"
                                    value={formik.values.annual_revenue}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    type='text'
                                />
                            </FormControl>
                        </div>
                    </div>


                    <div className='w-full row  '>
                        <div className='w-1/5 mb-8 mt-2.5 ms-2'>
                            <Autocomplete
                                value={formik.values.industry}
                                onChange={(event, value) => formik.setFieldValue("industry", value)}
                                onBlur={formik.handleBlur}
                                sx={{backgroundColor: 'white'}}
                                options={['1', '2', '3']}
                                renderInput={(params) => <TextField {...params} name='industry'
                                                                    label="industry"/>}
                            />
                        </div>

                        <div className='w-1/5 mb-8 mt-2.5'>
                            <Autocomplete
                                value={formik.values.status}
                                onChange={(event, value) => formik.setFieldValue("status", value)}
                                onBlur={formik.handleBlur}
                                sx={{backgroundColor: 'white'}}
                                options={['active', 'inactive']}
                                renderInput={(params) => <TextField {...params} name='status'
                                                                    label="Status"/>}
                            />
                            </div>

                            <div className='w-1/5 mb-5'>
                                <FormControl fullWidth sx={{m: 1}}>
                                    <InputLabel htmlFor="assigned_to">Assigned To</InputLabel>
                                    <OutlinedInput
                                        placeholder='Assigned To'
                                        sx={{backgroundColor: 'white'}}
                                        id="assigned_to"
                                        startAdornment={<InputAdornment position="start"></InputAdornment>}
                                        label="Assigned to"
                                        name='assigned_to'
                                        value={formik.values.assigned_to}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        type='text'
                                    />
                                </FormControl>
                            </div>
                        </div>


                    </div>
                    <TextareaDecorators/>

                    <div className='flex items-center justify-end gap-5'>
                        <Button className='py-3 px-6 font-bold' variant="outlined"
                                onClick={handleBackClick}>Cancel</Button>
                        <input type='submit'
                               className='mainBackgroundColor font-bold text-white cursor-pointer rounded py-3 px-6'
                               value={selectedId ? 'Edit Account' : 'Add Account'}/>
                    </div>
                </div>


        </form>
    </>
    )
        ;
    }
