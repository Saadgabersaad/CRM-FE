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
                contacts: ['']
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
                <div className='  flex flex-col gap-5 py-7 rounded w-full '>

                    {contacts.length > 0 ? contacts.map((contact, index) => (
                        <AddAccounts
                            key={index}
                            contact={contact}
                            mode={mode}
                            selectedId={selectedId}
                        />
                    )) : <AddAccounts
                        submit={formik.handleSubmit}
                        mode={mode}
                        selectedId={selectedId}
                    />}
                </div>

        <form
            className='w-full'
            onSubmit={formik.handleSubmit}
        >


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
                        <Button className='py-3 px-6 font-bold' variant="outlined" onClick={handleBackClick}>Cancel</Button>
                        <input type='submit'
                               className='mainBackgroundColor font-bold text-white cursor-pointer rounded py-3 px-6'
                               value={selectedId ? 'Edit Account' : 'Add Account'}/>
                    </div>
                </div>


            </form>
            </>
        );
    }
