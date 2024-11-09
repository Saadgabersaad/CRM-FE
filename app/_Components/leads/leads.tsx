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

export default function AddLeads({ mode, selectedId }:{mode:string,selectedId:number}) {
    const router = useRouter();
    const [loading, setLoading] = useState(mode === 'edit'); // Only show loader if editing

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            source: '',
            interest_level: '',
            status: '',
            field: '',
            assigned_to: '',
        },
        onSubmit: async (values) => handleSubmit(values),
    });

    // Handle form submission
    async function handleSubmit(values:any) {
        try {
            if (mode === 'edit' && selectedId) {
                await ApiService.editLead(selectedId, values);
            } else {
                await ApiService.postLeads(values);
            }
            router.replace('/leads'); // Redirect to leads page after submission
        } catch (error) {
            console.error('Failed to submit data:', error);
        }
    }

    // Fetch lead data if in edit mode
    useEffect(() => {
        if (mode === 'edit' && selectedId) {
            const fetchLeadData = async () => {
                try {
                    const response = await ApiService.getLeadById(selectedId);
                    const leadData = response.data.data;
                    if (leadData) formik.setValues(leadData);
                } catch (error) {
                    console.error('Failed to fetch lead data:', error);
                } finally {
                    setLoading(false);
                }
            };
            fetchLeadData();
        }
    }, [mode, selectedId]);



    const handleBackClick = () => router.back();

    if (loading) return <div className="loader"></div>;

    return (

        <form
            onSubmit={formik.handleSubmit}
            className='tertiary-color px-12 py-7 rounded w-full  '
        >

            <AddImageBtn/>

            <div className='flex justify-around tertiary-color w-[75%]  my-5 gap-6 '>


                <div className='w-full  pr-10 border-r-2 border-r-gray-300'>

                    <div className='w-full  mb-5 '>
                        <FormControl fullWidth sx={{m: 1}}>
                            <InputLabel htmlFor="lead-name">Lead Name</InputLabel>
                            <OutlinedInput

                                sx={{backgroundColor: 'white'}}
                                placeholder='Add Lead Name'
                                id="lead-name"
                                startAdornment={<InputAdornment position="start"></InputAdornment>}
                                label="lead_name"
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                type='text'
                            />
                        </FormControl>
                    </div>

                    <div className='w-full mb-5'>
                        <FormControl fullWidth sx={{m: 1}}>
                            <InputLabel htmlFor="email">Lead Email</InputLabel>
                            <OutlinedInput
                                placeholder='Add Lead Email'
                                sx={{backgroundColor: 'white'}}
                                id="email"
                                startAdornment={<InputAdornment position="start"></InputAdornment>}
                                label="Lead Email"
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
                            <InputLabel htmlFor="Lead-Phone-number">Lead Phone number </InputLabel>
                            <OutlinedInput
                                placeholder='phone'
                                sx={{backgroundColor: 'white'}}
                                id="Lead-Phone-number"
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

                    <div className='w-full mb-8 mx-2'>
                        {/*<label htmlFor="type">Status</label>*/}
                        <Autocomplete
                            value={formik.values.status}
                            onChange={(event, value) => formik.setFieldValue("interest_level", value)}
                            onBlur={formik.handleBlur}
                            sx={{backgroundColor: 'white'}}
                            options={['high', 'medium','low']}
                            renderInput={(params) => <TextField {...params} name='interest_level' label="Interest Level"/>}
                        />
                    </div>


                </div>

                <div className='w-full  mb-5 pr-5'>


                    <div className='w-full mb-7'>


                        <FormControl fullWidth sx={{m: 1}}>
                            <InputLabel htmlFor="field">Add Field</InputLabel>
                            {/*<label>Contact Email</label>*/}
                            <OutlinedInput
                                sx={{backgroundColor: 'white'}}
                                placeholder='Add Field'
                                id="field"
                                startAdornment={<InputAdornment position="start"></InputAdornment>}
                                label="Add_Field"
                                name="field"
                                value={formik.values.field}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                type='text'
                            />

                        </FormControl>
                    </div>

                    <div className='w-full mb-9 mx-2'>
                        <Autocomplete
                            value={formik.values.source}
                            onChange={(event, value) => formik.setFieldValue("source", value)}
                            onBlur={formik.handleBlur}
                            sx={{backgroundColor: 'white'}}
                            options={['website', 'referral', 'event']}
                            renderInput={(params) => <TextField {...params} name='source' label="Lead Source"/>}
                        />
                    </div>

                    <div className='w-full mb-8 mx-2'>
                        {/*<label htmlFor="type">Status</label>*/}
                        <Autocomplete
                            value={formik.values.status}
                            onChange={(event, value) => formik.setFieldValue("status", value)}
                            onBlur={formik.handleBlur}
                            sx={{backgroundColor: 'white'}}
                            options={['new', 'contacted', 'qualified', 'lost']}
                            renderInput={(params) => <TextField {...params} name='status' label="Lead Status"/>}
                        />
                    </div>


                </div>
            </div>


            <TextareaDecorators/>
            <div className='flex items-center justify-end gap-5'>
                <Button className='py-3 px-6 font-bold' variant="outlined" onClick={handleBackClick}>Cancel</Button>
                <input type='submit'
                       className='mainBackgroundColor font-bold text-white cursor-pointer rounded py-3 px-6'
                       value={selectedId ? 'Edit Lead' : 'Add Lead'}/>
            </div>
        </form>

    );
}

//
//
// 'use client';
// import React, { useEffect, useState } from 'react';
// import {
//     OutlinedInput,
//     InputLabel,
//     InputAdornment,
//     FormControl,
//     TextField,
//     Autocomplete,
// } from '@mui/material';
// import AddImageBtn from '@/app/add-customer/addImage';
// import TextareaDecorators from '@/app/add-customer/textArea';
// import Button from '@mui/joy/Button';
// import { useRouter } from 'next/navigation';
// import { useFormik } from 'formik';
// import ApiService from '@/app/services/api.service';
// import { useIDContext } from '@/app/context/customerIdProvider';
//
// export default function AddLeads() {
//     const { selectedId } = useIDContext(); // Access the selected ID from context
//     const router = useRouter(); // Next.js router instance
//
//     const [loading, setLoading] = useState(true); // Track loading state
//
//     const formik = useFormik({
//         initialValues: {
//             name: '',
//             email: '',
//             phone: '',
//             source: '',
//             interest_level: '',
//             status: '',
//             field: '',
//             assigned_to: '',
//         },
//         onSubmit: async (values) => handleSubmit(values),
//     });
//
//     // Function to handle form submission
//     async function handleSubmit(values) {
//         try {
//             if (selectedId) {
//                 // Edit Lead
//                 await ApiService.editLead(selectedId, values);
//                 console.log('Lead edited:', values, selectedId);
//             } else {
//                 // Add New Lead
//                 const newLead = await ApiService.postLeads(values);
//                 console.log('Lead added:', values);
//
//                 // Update URL to "edit-lead/[id]" after adding
//                 router.replace(`/leads/edit-lead/${newLead.data.id}`);
//             }
//             router.replace('/leads'); // Redirect to leads page after submission
//         } catch (error) {
//             console.error('Failed to submit data:', error);
//             // Optionally show a toast notification
//         }
//     }
//
//     // Fetch data if editing a lead
//     useEffect(() => {
//         const fetchLeadData = async () => {
//             try {
//                 const response = await ApiService.getLeadById(selectedId);
//                 const leadData = response.data.data;
//                 if (leadData) formik.setValues(leadData); // Populate form with lead data
//             } catch (error) {
//                 console.error('Failed to fetch lead data:', error);
//             } finally {
//                 setLoading(false); // Stop loading indicator
//             }
//         };
//
//         if (selectedId) {
//             router.replace(`/leads/edit-lead/${selectedId}`); // Update URL for edit mode
//             fetchLeadData(); // Fetch lead data only if an ID is available
//         } else {
//             router.replace('/leads/add-lead'); // Ensure URL is correct for add mode
//             setLoading(false); // Stop loading if adding a new lead
//         }
//     }, [selectedId, router]);
//
//     const handleBackClick = () => router.back(); // Navigate back
//
//     if (loading) return <div className="loader"></div>; // Show loader during data fetch
//
//     return (
//         <form
//             onSubmit={formik.handleSubmit}
//             className="tertiary-color px-12 py-7 rounded w-full"
//         >
//             <AddImageBtn />
//
//             <div className="flex justify-around tertiary-color w-[75%] my-5 gap-6">
//                 <div className="w-full pr-10 border-r-2 border-r-gray-300">
//                     {/* Lead Name Input */}
//                     <FormControl fullWidth sx={{ m: 1 }}>
//                         <InputLabel htmlFor="lead-name">Lead Name</InputLabel>
//                         <OutlinedInput
//                             sx={{ backgroundColor: 'white' }}
//                             placeholder="Add Lead Name"
//                             id="lead-name"
//                             name="name"
//                             value={formik.values.name}
//                             onChange={formik.handleChange}
//                             onBlur={formik.handleBlur}
//                             type="text"
//                             label="Lead Name"
//                         />
//                     </FormControl>
//
//                     {/* Lead Email Input */}
//                     <FormControl fullWidth sx={{ m: 1 }}>
//                         <InputLabel htmlFor="email">Lead Email</InputLabel>
//                         <OutlinedInput
//                             sx={{ backgroundColor: 'white' }}
//                             placeholder="Add Lead Email"
//                             id="email"
//                             name="email"
//                             value={formik.values.email}
//                             onChange={formik.handleChange}
//                             onBlur={formik.handleBlur}
//                             type="email"
//                             label="Lead Email"
//                         />
//                     </FormControl>
//
//                     {/* Phone Number Input */}
//                     <FormControl fullWidth sx={{ m: 1 }}>
//                         <InputLabel htmlFor="phone">Lead Phone Number</InputLabel>
//                         <OutlinedInput
//                             sx={{ backgroundColor: 'white' }}
//                             placeholder="Add Phone Number"
//                             id="phone"
//                             name="phone"
//                             value={formik.values.phone}
//                             onChange={formik.handleChange}
//                             onBlur={formik.handleBlur}
//                             type="text"
//                             label="Phone"
//                         />
//                     </FormControl>
//
//                     {/* Interest Level Autocomplete */}
//                     <Autocomplete
//                         value={formik.values.interest_level}
//                         onChange={(e, value) => formik.setFieldValue('interest_level', value)}
//                         onBlur={formik.handleBlur}
//                         sx={{ backgroundColor: 'white', m: 1 }}
//                         options={['high', 'medium', 'low']}
//                         renderInput={(params) => (
//                             <TextField {...params} label="Interest Level" name="interest_level" />
//                         )}
//                     />
//                 </div>
//
//                 <div className="w-full pr-5">
//                     {/* Field Input */}
//                     <FormControl fullWidth sx={{ m: 1 }}>
//                         <InputLabel htmlFor="field">Field</InputLabel>
//                         <OutlinedInput
//                             sx={{ backgroundColor: 'white' }}
//                             placeholder="Add Field"
//                             id="field"
//                             name="field"
//                             value={formik.values.field}
//                             onChange={formik.handleChange}
//                             onBlur={formik.handleBlur}
//                             type="text"
//                             label="Field"
//                         />
//                     </FormControl>
//
//                     {/* Source Autocomplete */}
//                     <Autocomplete
//                         value={formik.values.source}
//                         onChange={(e, value) => formik.setFieldValue('source', value)}
//                         onBlur={formik.handleBlur}
//                         sx={{ backgroundColor: 'white', m: 1 }}
//                         options={['website', 'referral', 'event']}
//                         renderInput={(params) => (
//                             <TextField {...params} label="Lead Source" name="source" />
//                         )}
//                     />
//
//                     {/* Status Autocomplete */}
//                     <Autocomplete
//                         value={formik.values.status}
//                         onChange={(e, value) => formik.setFieldValue('status', value)}
//                         onBlur={formik.handleBlur}
//                         sx={{ backgroundColor: 'white', m: 1 }}
//                         options={['new', 'contacted', 'qualified', 'lost']}
//                         renderInput={(params) => (
//                             <TextField {...params} label="Status" name="status" />
//                         )}
//                     />
//                 </div>
//             </div>
//
//             <TextareaDecorators />
//
//             <div className="flex items-center justify-end gap-5">
//                 <Button variant="outlined" onClick={handleBackClick}>
//                     Cancel
//                 </Button>
//                 <input
//                     type="submit"
//                     className="mainBackgroundColor font-bold text-white cursor-pointer rounded py-3 px-6"
//                     value={selectedId ? 'Edit Lead' : 'Add Lead'}
//                 />
//             </div>
//         </form>
//     );
// }
//

// // 'use client'
// // import * as React from 'react';
// // import OutlinedInput from '@mui/material/OutlinedInput';
// // import InputLabel from '@mui/material/InputLabel';
// // import InputAdornment from '@mui/material/InputAdornment';
// // import FormControl from '@mui/material/FormControl';
// // import AddImageBtn from "@/app/add-customer/addImage";
// // import TextareaDecorators from "@/app/add-customer/textArea";
// // import Button from "@mui/joy/Button";
// // import {usePathname, useRouter} from "next/navigation";
// // import {useFormik} from "formik";
// // import TextField from "@mui/material/TextField";
// // import Autocomplete from "@mui/material/Autocomplete";
// // import ApiService from "@/app/services/api.service";
// // import {useEffect, useState} from "react";
// // import {useIDContext} from "@/app/context/customerIdProvider";
// //
// //
// // export default function AddLeads() {
// //     const { selectedId } = useIDContext(); // Access the selected ID
// //
// //     const pathname = usePathname()
// //     const router = useRouter()
// //     const handleBackClick = () => {
// //         router.back();
// //     };
// //
// //     async function handleSubmit(values) {
// //         try {
// //             if (selectedId) {
// //                 // Edit Lead
// //                 await ApiService.editLead(selectedId, values);
// //                 console.log('Lead edited:', values,selectedId);
// //                 router.replace("/leads"); // Redirect to leads page after editing
// //             } else {
// //                 // Add New Lead
// //                 await ApiService.postLeads(values);
// //                 console.log('Lead added:', values);
// //                 router.replace("/leads"); // Redirect to leads page after adding
// //             }
// //         } catch (error) {
// //             console.error('Failed to submit data:', error);
// //             // Optionally show a toast notification or an error message here
// //         }
// //     }
// //
// //
// //     const formik =  useFormik({
// //         initialValues:{
// //             name:'',
// //             email:'',
// //             phone:'',
// //             source:'',
// //             interest_level:'',
// //             status:'',
// //             field:'',
// //             assigned_to:'',
// //         },
// //         onSubmit:  async (values) => handleSubmit(values),
// //
// //     })
// //
// //
// //
// //     useEffect(() => {
// //         const fetchLeadData = async () => {
// //             try {
// //                 const response = await ApiService.getLeadById(selectedId);
// //                 const leadData = response.data.data;
// //                 if (leadData) formik.setValues(leadData); // Set fetched data to form
// //             } catch (error) {
// //                 console.error('Failed to fetch customer data:', error);
// //             } finally {
// //                 setLoading(false); // Stop loading indicator
// //             }
// //         };
// //         if (selectedId) fetchLeadData(); // Fetch only if an ID is available
// //     }, [selectedId]);
// //
// //
// //
// //
// //
// //     const [loading, setLoading] = useState(true); // Track loading state
// //
// //     if (loading) return <div className='loader'></div>;
// //
// //     return (
// //
// //         <form
// //             onSubmit={formik.handleSubmit}
// //             className='tertiary-color px-12 py-7 rounded w-full  '
// //         >
// //
// //             <AddImageBtn/>
// //
// //             <div className='flex justify-around tertiary-color w-[75%]  my-5 gap-6 '>
// //
// //
// //                 <div className='w-full  pr-10 border-r-2 border-r-gray-300'>
// //
// //                     <div className='w-full  mb-5 '>
// //                         <FormControl fullWidth sx={{m: 1}}>
// //                             <InputLabel htmlFor="lead-name">Lead Name</InputLabel>
// //                             <OutlinedInput
// //
// //                                 sx={{backgroundColor: 'white'}}
// //                                 placeholder='Add Lead Name'
// //                                 id="lead-name"
// //                                 startAdornment={<InputAdornment position="start"></InputAdornment>}
// //                                 label="lead_name"
// //                                 name="name"
// //                                 value={formik.values.name}
// //                                 onChange={formik.handleChange}
// //                                 onBlur={formik.handleBlur}
// //                                 type='text'
// //                             />
// //                         </FormControl>
// //                     </div>
// //
// //                     <div className='w-full mb-5'>
// //                         <FormControl fullWidth sx={{m: 1}}>
// //                             <InputLabel htmlFor="email">Lead Email</InputLabel>
// //                             <OutlinedInput
// //                                 placeholder='Add Lead Email'
// //                                 sx={{backgroundColor: 'white'}}
// //                                 id="email"
// //                                 startAdornment={<InputAdornment position="start"></InputAdornment>}
// //                                 label="Lead Email"
// //                                 name="email"
// //                                 value={formik.values.email}
// //                                 onChange={formik.handleChange}
// //                                 onBlur={formik.handleBlur}
// //                                 type='email'
// //                             />
// //                         </FormControl>
// //                     </div>
// //
// //
// //                     <div className='w-full mb-5'>
// //
// //
// //                         <FormControl fullWidth sx={{m: 1}}>
// //                             <InputLabel htmlFor="Lead-Phone-number">Lead Phone number </InputLabel>
// //                             <OutlinedInput
// //                                 placeholder='phone'
// //                                 sx={{backgroundColor: 'white'}}
// //                                 id="Lead-Phone-number"
// //                                 startAdornment={<InputAdornment position="start"></InputAdornment>}
// //                                 label="Contact Phone number"
// //                                 name='phone'
// //                                 value={formik.values.phone}
// //                                 onChange={formik.handleChange}
// //                                 onBlur={formik.handleBlur}
// //                                 type='phone'
// //                             />
// //                         </FormControl>
// //                     </div>
// //
// //                     <div className='w-full mb-8 mx-2'>
// //                         {/*<label htmlFor="type">Status</label>*/}
// //                         <Autocomplete
// //                             value={formik.values.status}
// //                             onChange={(event, value) => formik.setFieldValue("interest_level", value)}
// //                             onBlur={formik.handleBlur}
// //                             sx={{backgroundColor: 'white'}}
// //                             options={['high', 'medium','low']}
// //                             renderInput={(params) => <TextField {...params} name='interest_level' label="Interest Level"/>}
// //                         />
// //                     </div>
// //
// //
// //                 </div>
// //
// //                 <div className='w-full  mb-5 pr-5'>
// //
// //
// //                     <div className='w-full mb-7'>
// //
// //
// //                         <FormControl fullWidth sx={{m: 1}}>
// //                             <InputLabel htmlFor="field">Add Field</InputLabel>
// //                             {/*<label>Contact Email</label>*/}
// //                             <OutlinedInput
// //                                 sx={{backgroundColor: 'white'}}
// //                                 placeholder='Add Field'
// //                                 id="field"
// //                                 startAdornment={<InputAdornment position="start"></InputAdornment>}
// //                                 label="Add_Field"
// //                                 name="field"
// //                                 value={formik.values.field}
// //                                 onChange={formik.handleChange}
// //                                 onBlur={formik.handleBlur}
// //                                 type='text'
// //                             />
// //
// //                         </FormControl>
// //                     </div>
// //
// //                     <div className='w-full mb-9 mx-2'>
// //                         <Autocomplete
// //                             value={formik.values.source}
// //                             onChange={(event, value) => formik.setFieldValue("source", value)}
// //                             onBlur={formik.handleBlur}
// //                             sx={{backgroundColor: 'white'}}
// //                             options={['website', 'referral', 'event']}
// //                             renderInput={(params) => <TextField {...params} name='source' label="Lead Source"/>}
// //                         />
// //                     </div>
// //
// //                     <div className='w-full mb-8 mx-2'>
// //                         {/*<label htmlFor="type">Status</label>*/}
// //                         <Autocomplete
// //                             value={formik.values.status}
// //                             onChange={(event, value) => formik.setFieldValue("status", value)}
// //                             onBlur={formik.handleBlur}
// //                             sx={{backgroundColor: 'white'}}
// //                             options={['new', 'contacted', 'qualified', 'lost']}
// //                             renderInput={(params) => <TextField {...params} name='status' label="Lead Status"/>}
// //                         />
// //                     </div>
// //
// //
// //                 </div>
// //             </div>
// //
// //
// //             <TextareaDecorators/>
// //             <div className='flex items-center justify-end gap-5'>
// //                 <Button className='py-3 px-6 font-bold' variant="outlined" onClick={handleBackClick}>Cancel</Button>
// //                 <input type='submit'
// //                        className='mainBackgroundColor font-bold text-white cursor-pointer rounded py-3 px-6'
// //                        value={selectedId ? 'Edit Lead' : 'Add Lead'}/>
// //             </div>
// //         </form>
// //
// //     );
// // }
// //
// //
// //
// //
