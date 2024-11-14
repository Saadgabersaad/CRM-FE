// 'use client';
// import React, { useEffect, useState } from 'react';
// import {OutlinedInput, InputLabel,InputAdornment, FormControl,} from '@mui/material';
// import AddImageBtn from '@/app/customers/add-customer/addImage';
// import { useRouter } from 'next/navigation';
// import { useFormik } from 'formik';
// import ApiService from '@/app/services/api.service';
//
// export default function AddAccounts({ mode, selectedId,contact,submit }:{mode:string,selectedId:number,contact:any}) {
//     const router = useRouter();
//     const [loading, setLoading] = useState(mode === 'edit'); // Only show loader if editing
//
//     const formik = useFormik({
//         initialValues: {
//             name: contact?.name || '',
//             email: contact?.email || '',
//             phone: contact?.phone || '',
//             position: contact?.position || '',
//
//         },
//         onSubmit: async (values) => handleSubmit(values),
//     });
//
//     // Handle form submission
//     async function handleSubmit(values:any) {
//         try {
//             if (mode === 'edit' && selectedId) {
//                 await ApiService.editAccount(selectedId, values);
//             } else {
//                 await ApiService.postAccounts(values);
//             }
//             router.replace('/accounts'); // Redirect to leads page after submission
//         } catch (error) {
//         }
//     }
//
//     // Fetch lead data if in edit mode
//     useEffect(() => {
//         if (mode === 'edit' && selectedId) {
//                    formik.setValues(contact);
//                     setLoading(false);
//         }
//
//     }, [mode, selectedId]);
//
//
//     // const handleBackClick = () => router.back();
//
//     if (loading) return <div className="loader"></div>;
//
//     return (
//
//         <form
//             onSubmit={submit}
//             className='tertiary-color  flex flex-col gap-4 py-8 px-5 rounded w-full  '
//         >
//           <div>
//               <AddImageBtn/>
//
//               <div className='flex justify-around tertiary-color   my-5 gap-6 '>
//
//
//                   <div className='w-full row   '>
//
//                       <div className='w-1/5  mb-5 '>
//                           <FormControl fullWidth sx={{m: 1}}>
//                               <InputLabel htmlFor="lead-name">Contact Name</InputLabel>
//                               <OutlinedInput
//
//                                   sx={{backgroundColor: 'white'}}
//                                   placeholder='Contact Name'
//                                   id="contact-name"
//                                   startAdornment={<InputAdornment position="start"></InputAdornment>}
//                                   label="contact-name"
//                                   name="name"
//                                   value={formik.values?.name}
//                                   onChange={formik.handleChange}
//                                   onBlur={formik.handleBlur}
//                                   type='text'
//                               />
//                           </FormControl>
//                       </div>
//
//
//                       <div className='w-1/5  mb-5'>
//                           <FormControl fullWidth sx={{m: 1}}>
//                               <InputLabel htmlFor="contact-position">Contact Position </InputLabel>
//                               <OutlinedInput
//                                   placeholder='Contact Position'
//                                   sx={{backgroundColor: 'white'}}
//                                   id="contact-position"
//                                   startAdornment={<InputAdornment position="start"></InputAdornment>}
//                                   label="Contact Position"
//                                   name='position'
//                                   value={formik.values?.position}
//                                   onChange={formik.handleChange}
//                                   onBlur={formik.handleBlur}
//                                   type='text'
//                               />
//                           </FormControl>
//                       </div>
//
//                       <div className='w-1/5  mb-5'>
//                           <FormControl fullWidth sx={{m: 1}}>
//                               <InputLabel htmlFor="email">Contact Email</InputLabel>
//                               <OutlinedInput
//                                   placeholder='Add Contact Email'
//                                   sx={{backgroundColor: 'white'}}
//                                   id="email"
//                                   startAdornment={<InputAdornment position="start"></InputAdornment>}
//                                   label="Contact Email"
//                                   name="email"
//                                   value={formik.values?.email}
//                                   onChange={formik.handleChange}
//                                   onBlur={formik.handleBlur}
//                                   type='email'
//                               />
//                           </FormControl>
//                       </div>
//
//
//                       <div className='w-1/5  mb-5'>
//
//
//                           <FormControl fullWidth sx={{m: 1}}>
//                               <InputLabel htmlFor="Lead-Phone-number">Account Phone number </InputLabel>
//                               <OutlinedInput
//                                   placeholder='Contact Phone number'
//                                   sx={{backgroundColor: 'white'}}
//                                   id="Account-Phone-number"
//                                   startAdornment={<InputAdornment position="start"></InputAdornment>}
//                                   label="Contact Phone number"
//                                   name='phone'
//                                   value={formik.values?.phone}
//                                   onChange={formik.handleChange}
//                                   onBlur={formik.handleBlur}
//                                   type='phone'
//                               />
//                           </FormControl>
//                       </div>
//
//
//                   </div>
//
//               </div>
//
//
//               <div className='flex items-center justify-end gap-5'>
//
//                   <input type='submit'
//                          className={`${selectedId ? 'btn-danger':'btn-main'}`}
//                          value={selectedId ? 'Remove Account' : 'Add Additional Account'}/>
//               </div>
//           </div>
//         </form>
//
//     );
// }
