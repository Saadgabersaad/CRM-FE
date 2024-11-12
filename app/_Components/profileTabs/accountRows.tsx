import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Image from "next/image";
import Logo from "../../assets/beed83bf6aee26c5540858387e08bd9a.jpeg";
import { Mail, Phone, SquarePen } from 'lucide-react';
import ApiService from "@/app/services/api.service";

interface Contact {
    id: number;
    name: string;
    email: string;
    phone: string;
    position: string;
}

interface Data {
    id: number;
    name: string;
    industry: number;
    annual_revenue: string;
    status: string;
    comment: string;
    assigned_to: string;
    contacts: Contact[];
}

function createData(
    id: number,
    name: string,
    industry: number,
    annual_revenue: string,
    status: string,
    assigned_to: string,
    comment: string,
    contacts: Contact[]
): Data {
    return {
        id,
        name,
        industry,
        annual_revenue,
        status,
        assigned_to,
        comment,
        contacts,
    };
}

function Row({ row }: { row: Data }) {
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow className="tertiary-color rounded-full shadows">
                <TableCell sx={{
                         border: '1px solid #E4E4E4',
                         borderRight: "0",
                         borderTopLeftRadius: '4px',
                         borderBottomLeftRadius: '4px',
                         height: '88px'
                }}>
                    <IconButton
                        className="text-primary"
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
                    </IconButton>
                </TableCell>
                <TableCell className="text-primary text-[24px]" sx={{
                    border: '1px solid #E4E4E4',
                    borderRight: "0",
                    borderLeft: "0",
                    height: '88px' }}>
                    {row.name}
                </TableCell>
                <TableCell sx={{
                    border: '1px solid #E4E4E4',
                    borderRight: "0",
                    borderLeft: "0",
                    height: '88px' }}>
                    <span className="text-primary"> $ Revenue : </span>
                    {row.annual_revenue}
                </TableCell>
                <TableCell sx={{
                    border: '1px solid #E4E4E4',
                    borderRight: "0",
                    borderLeft: "0",
                    height: '88px'
                }}>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            borderRadius: '5px',
                            padding: '8px',
                            backgroundColor: row.status === 'active' ? '#ccf0eb' : '#e0d4fc',
                            color: row.status === 'active' ? '#00B69B' : '#6226EF',
                        }}
                    >
                        {row.status}
                    </div>
                </TableCell>
                <TableCell sx={{
                    border: '1px solid #E4E4E4',
                    borderLeft: "0",
                    borderTopRightRadius: '4px',
                    borderBottomRightRadius:'4px',
                    height: '88px' }}>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            borderRadius: '5px',
                            padding: '8px',
                            backgroundColor: row.status === 'active' ? '#ccf0eb' : '#e0d4fc',
                            color: row.status === 'active' ? '#00B69B' : '#6226EF',
                        }}
                    >
                        {row.industry}
                    </div>
                </TableCell>
            </TableRow>

            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                        <div className='flex justify-start items-center'>
                            <Typography className='mainColor mr-1' variant="subtitle1"  >
                            Assigned To :
                            </Typography>
                            <Typography className='font-bold' variant="subtitle1"> {row.assigned_to}</Typography>
                        </div>
                            <Typography className='font-bold' variant="h6" gutterBottom component="div">
                                Related Contacts
                            </Typography>
                            <Table sx={{ borderSpacing: '0 10px', borderCollapse: 'separate' }} size="medium">
                                <TableBody>
                                    {row.contacts.map((contact) => (
                                        <TableRow key={contact.id} sx={{ border: 'none' }}>
                                            <TableCell sx={{   border: '1px solid #E4E4E4',
                                                borderRight: "0",
                                                borderTopLeftRadius: '4px',
                                                borderBottomLeftRadius: '4px' }}>
                                                <span className="text-primary">ID:</span> {contact.id}
                                            </TableCell>
                                            <TableCell sx={{ border: '1px solid #E4E4E4',
                                                borderRight: "0",
                                                borderLeft: "0" }}>
                                                <div className="row">
                                                    <Image className="rounded-full" src={Logo} alt="profile" width={28} height={28} />
                                                    <div>{contact.name}</div>
                                                </div>
                                            </TableCell>
                                            <TableCell sx={{  border: '1px solid #E4E4E4',
                                                borderRight: "0",
                                                borderLeft: "0",}}>
                                                <div className="row">
                                                    Product Designer at <span className="text-primary"> {contact.position}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell sx={{ border: '1px solid #E4E4E4',
                                                borderRight: "0",
                                                borderLeft: "0" }}>
                                                <Mail size={20} /> {contact.email}
                                            </TableCell>
                                            <TableCell sx={{  border: '1px solid #E4E4E4',
                                                borderRight: "0",
                                                borderLeft: "0", }}>
                                                <Phone size={20} /> {contact.phone}
                                            </TableCell>
                                            <TableCell sx={{
                                                border: '1px solid #E4E4E4',
                                                borderLeft: "0",
                                                borderTopRightRadius:'4px',
                                                borderBottomRightRadius:'4px',
                                            }}>
                                                <button className="mainColor flex items-center font-bold gap-2">
                                                    <SquarePen size={20} />
                                                </button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default function CollapsibleTable() {
    const [rows, setRows] = useState<Data[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAccountsData = async () => {
            try {
                const response = await ApiService.getAccounts();
                const data = response.data.data.map((item: any) =>
                    createData(item.id, item.name, item.industry, item.annual_revenue, item.status, item.assigned_to, item.comment, item.contacts)
                );
                setRows(data);
            } catch (error) {
                console.error("Error fetching accounts data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAccountsData();
    }, []);

    return (
        <TableContainer sx={{ border: 'none' }}>
            <Table sx={{ borderSpacing: '0 10px', borderCollapse: 'separate' }} aria-label="collapsible table">
                <TableBody>
                    {rows.map((row) => (
                        <Row key={row.id} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

//
// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Collapse from '@mui/material/Collapse';
// import IconButton from '@mui/material/IconButton';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableRow from '@mui/material/TableRow';
// import Typography from '@mui/material/Typography';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
// import Image from "next/image";
// import Logo from "../../assets/beed83bf6aee26c5540858387e08bd9a.jpeg";
// import { Mail, Phone, SquarePen } from 'lucide-react';
// import { useEffect, useState } from "react";
// import ApiService from "@/app/services/api.service";
//
// interface Contact {
//     id: number;
//     name: string;
//     email: string;
//     phone: string;
//     position: string;
// }
//
// interface Data {
//     id: number;
//     name: string;
//     industry: number;
//     annual_revenue: string;
//     status: string;
//     comment: string;
//     assigned_to: string;
//     contacts: Contact[];
// }
//
// function createData(
//     id: number,
//     name: string,
//     industry: number,
//     annual_revenue: string,
//     status: string,
//     assigned_to: string,
//     comment: string,
//     contacts: Contact[]
// ): Data {
//     return { id, name, industry, annual_revenue, status, assigned_to, comment, contacts };
// }
//
// function Row({ row }: { row: Data }) {
//     const [open, setOpen] = React.useState(false);
//
//     return (
//         <React.Fragment>
//             <TableRow className='tertiary-color rounded-full shadows'>
//                 <TableCell
//                     sx={{
//                         border: '1px solid #E4E4E4',
//                         borderRight: "0",
//                         borderTopLeftRadius: '4px',
//                         borderBottomLeftRadius: '4px',
//                         height: '88px'
//                     }}>
//                     <IconButton
//                         className='text-primary'
//                         aria-label="expand row"
//                         size="small"
//                         onClick={() => setOpen(!open)}
//                     >
//                         {open ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
//                     </IconButton>
//                 </TableCell>
//                 <TableCell
//                     className='text-primary text-[24px]'
//                     sx={{
//                         border: '1px solid #E4E4E4',
//                         borderLeft: "0",
//                         borderRight: '0',
//                     }}
//                     component="th" scope="row">
//                     {row.name}
//                 </TableCell>
//                 <TableCell
//                     sx={{
//                         border: '1px solid #E4E4E4',
//                         borderLeft: "0",
//                         borderRight: '0',
//                     }}
//                     align="left">
//                     <span className='text-primary'> $ Revenue: </span>
//                     {row.annual_revenue}
//                 </TableCell>
//                 <TableCell
//                     sx={{
//                         border: '1px solid #E4E4E4',
//                         borderLeft: "0",
//                         borderRight: '0',
//                     }}
//                     align="left">
//                     <div
//                         style={{
//                             display: 'flex',
//                             justifyContent: 'center',
//                             borderRadius: '5px',
//                             padding: '8px',
//                             backgroundColor: row.status === 'active' ? '#ccf0eb' : '#e0d4fc',
//                             color: row.status === 'active' ? '#00B69B' : '#6226EF',
//                         }}
//                     >
//                         {row.status}
//                     </div>
//                 </TableCell>
//                 <TableCell
//                     sx={{
//                         border: '1px solid #E4E4E4',
//                         borderLeft: "0",
//                         borderRight: '0',
//                     }}
//                     align="left">
//                     <div
//                         style={{
//                             display: 'flex',
//                             justifyContent: 'center',
//                             borderRadius: '5px',
//                             padding: '8px',
//                             backgroundColor: row.industry === 'active' ? '#ccf0eb' : '#e0d4fc',
//                             color: row.industry === 'active' ? '#00B69B' : '#6226EF',
//                         }}
//                     >
//                         {row.industry}
//                     </div>
//                 </TableCell>
//             </TableRow>
//         </React.Fragment>
//     );
// }
//
// export default function CollapsibleTable() {
//     const [rows, setRows] = useState<Data[]>([]);
//     const [loading, setLoading] = useState(true);
//
//     useEffect(() => {
//         const fetchAccountsData = async () => {
//             try {
//                 const response = await ApiService.getAccounts();
//                 const data = response.data.data.map((item: any) =>
//                     createData(
//                         item.id,
//                         item.name,
//                         item.industry,
//                         item.annual_revenue,
//                         item.status,
//                         item.assigned_to,
//                         item.comment,
//                         item.contacts
//                     )
//                 );
//                 setRows(data);
//             } catch (error) {
//                 console.error("Error fetching accounts data:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchAccountsData();
//     }, []);
//
//     return (
//         <TableContainer sx={{ border: 'none' }}>
//             <Table sx={{ borderColor: 'white', borderSpacing: '0 10px', borderCollapse: 'separate' }}
//                    aria-label="collapsible table">
//                 <TableBody>
//                     {rows.map((row) => (
//                         <Row key={row.id} row={row} />
//                     ))}
//                 </TableBody>
//             </Table>
//         </TableContainer>
//     );
// }
