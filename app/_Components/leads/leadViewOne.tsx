
'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import SplitButton from "@/app/customers/filters";
import {Phone, Mail, ArrowUp,ArrowDown} from "lucide-react";
import StatusMenu from "../popUpMenu/statusMenu/index";
import TablePagination from '@mui/material/TablePagination';
import SearchAppBar from "../secHeader";
import SelectedButton from "@/app/_Components/secHeader/groupButton";
import {useEffect, useMemo, useState} from "react";
import ApiService from "@/app/services/api.service";
import ResetFilter from "@/app/customers/resetFilter";
import {useIDContext} from "@/app/context/customerIdProvider";
import Image from "next/image";
import Logo from "../../assets/beed83bf6aee26c5540858387e08bd9a.jpeg"
import LongMenu from "@/app/_Components/option";
import AccordionUsage from "@/app/leads/sideFilters";




interface Data {
    id: number;
    name: string;
    email: string;
    phone: string;
    source: string;
    interest_level: string;
    status: string;
    assigned_to: string;
    created:string;
    field:string


}

function createData(
    id: number,
    name: string,
    email: string,
    phone: string,
    source: string,
    interest_level: string,
    status: string,
    assigned_to: string,
    created:string,
    field:string
): Data {
    return {
        id,
        name,
        source,
        phone,
        email,
        interest_level,
        status,
        assigned_to,
        created,
        field
    };
}


export default function LeadsViewOne() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [rows, setRows] = useState<Data[]>([]);
    const [loading, setLoading] = useState(true);
    const {setSelectedId} = useIDContext(); // Access context to set selected ID



    const fetchLeadData = async () => {
        try {
            const response = await ApiService.getLeads();
            const data = response.data.data.map((item:any) =>
                createData(
                    item.id,
                    item.name,
                    item.email,
                    item.phone,
                    item.source,
                    item.interest_level,
                    item.status,
                    item.assigned_to,
                    item.created,
                    item.field
                )
            );
            setRows(data);
        } catch (error) {
            console.error('Failed to fetch customers:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {

        fetchLeadData();
    }, []);



    const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
        setSelectedId(id);

    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const [statusFilter, setStatusFilter] = React.useState('');
    const [interestFilter, setInterestFilter] = React.useState('');
    const [sourceFilter, setSourceFilter] = React.useState('');
    const [fieldFilter, setFieldFilter] = React.useState('');
    const applyFilters = (rows: Data[], filters: Record<string, any>) => {
        return rows.filter(row =>
            Object.keys(filters).every(key =>
                !filters[key] || row[key as keyof Data] === filters[key]
            )
        );
    };
    const visibleRows = useMemo(() => {
        const filters = { status: statusFilter, source: sourceFilter,interest_level:interestFilter,field:fieldFilter };
        return applyFilters(rows, filters).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    }, [rows, statusFilter, sourceFilter, page, rowsPerPage,interestFilter,fieldFilter]);


    const handleResetFilters = () => {
        setStatusFilter("");
        setSourceFilter("");
        setInterestFilter("");
        setFieldFilter("");
        setRows(rows);
        setPage(0);
    };





    if (loading) return <div className='loader'></div>;


    return (
        <>
            <Box sx={{width: '100%'}}>

                <div className='flex z-50 items-center'>
                    <SelectedButton onFilter={setStatusFilter}/>
                    <SearchAppBar/>
                </div>

                <div className='flex flex-row items-center gap-3.5 h-10 shadow  my-5'>

                    <SplitButton onFilters={setSourceFilter}/>
                    <ResetFilter onReset={handleResetFilters}/>

                </div>

                <Paper sx={{width: '100%', mb: 2,display:'flex'}}>
                    <Box className='flex flex-col z-50 py-6 px-4 rounded w-1/5 secondaryColor'>
                        <div>
                            <h1 className='mainColor  border-0  text-2xl font-bold'>Filter</h1>
                        </div>
                        <div>
                            <AccordionUsage field={{fieldFilter,setFieldFilter}}  interest={{interestFilter,setInterestFilter}}  source={{sourceFilter,setSourceFilter}}  Status={{statusFilter, setStatusFilter}} />
                        </div>
                    </Box>

                    <TableContainer sx={{marginLeft: '25px'}}>

                        <Table
                            sx={{borderSpacing: '0 5px', borderCollapse: 'separate', minWidth: 750}}
                            aria-labelledby="tableTitle"

                        >
                            <TableBody>
                                {visibleRows.map((row, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    let interestColor = "";
                                    let ArrowIcon = ArrowUp;

                                    if (row.interest_level === "high") {
                                        interestColor = "text-green-500";
                                        ArrowIcon = ArrowUp;
                                    } else if (row.interest_level === "medium") {
                                        interestColor = "text-yellow-500";
                                        ArrowIcon = ArrowUp;
                                    } else if (row.interest_level === "low") {
                                        interestColor = "text-red-500";
                                        ArrowIcon = ArrowDown;
                                    }

                                    let sourceColor = "";
                                    if (row.source === "website") {
                                        sourceColor = "text-blue-500";
                                    } else if (row.source === "referral") {
                                        sourceColor = "text-green-500";
                                    } else if (row.source === "event") {
                                        sourceColor = "text-purple-500";
                                    }

                                    return (
                                        <TableRow

                                            hover
                                            onClick={(event) => handleClick(event, row.id)}
                                            role="checkbox"

                                            tabIndex={-1}
                                            key={row.id}
                                            sx={{cursor: 'pointer',height:"145px",  paddingX:'15px',
                                                paddingY:'10px'}}
                                        >

                                            <TableCell
                                                sx={{
                                                    border: '1px solid #ccc',
                                                    borderRight: "0",
                                                    borderTopLeftRadius: '4px',
                                                    borderBottomLeftRadius: '4px',
                                                    paddingX:'15px',
                                                    paddingY:'10px'

                                                }} padding="none" align="left">
                                                <div><Image src={Logo} alt='Client Profile Image'  className='w-[70px] h-[70px] rounded-lg' /></div>
                                                <div>
                                            <span className={`flex items-center gap-1.5 font-bold ${interestColor}`}>
                                            <ArrowIcon/>
                                                {row.interest_level}
                                            </span>

                                                </div>
                                            </TableCell>

                                            <TableCell
                                                sx={{
                                                    border: '1px solid #ccc',
                                                    borderRight: "0",
                                                    borderLeft: "0",
                                                    paddingX:'15px',
                                                    paddingY:'10px'

                                                }} padding="none" align="left">

                                                <div className='mainColor font-bold text-[16px]' id={labelId}
                                                >
                                                    {row.name}
                                                </div>

                                                <div className='flex flex-col gap-1.5 justify-start'>
                                                    <span className='flex justify-start items-center text-color gap-1.5'>
                                                <Phone className='mainColor'
                                                       size={16}
                                                       strokeWidth={2.5}/> {row.phone}</span>
                                                    <a href={row.email} target="_blank" className='flex justify-start items-center text-color gap-1.5'>
                                                        <Mail className='mainColor' size={16}
                                                              strokeWidth={2.5}/>{row.email}</a>
                                                </div>


                                            </TableCell>

                                            <TableCell

                                                sx={{
                                                    border: '1px solid #ccc',
                                                    borderRight: "0",
                                                    borderLeft: "0",
                                                    paddingX:'15px',
                                                    paddingY:'10px'

                                                }} padding="none" align="left"
                                            >

                                                <div className='text-color'>
                                                    ID-
                                                    {row.id}
                                                </div>

                                                <div className='row text-color'>
                                                    <span > Source : </span>
                                                    <span className={`flex items-center gap-1.5 font-bold ${sourceColor}`}>
                                                {row.source}
                                                 </span>
                                                </div>

                                                <div className='row'>
                                                    <span className='text-color'>
                                                        Assigned to :
                                                    </span>
                                                    <span className='font-bold'>
                                                       {row.assigned_to}
                                                        {/*<ClientMenu assign={row.assigned_to}/>*/}
                                                    </span>
                                                </div>


                                                <div className='text-color'>Field : {row.field}</div>
                                                <div  className='text-color'> Created : {row.created}</div>
                                            </TableCell>
                                            <TableCell sx={{
                                                border: '1px solid #ccc',
                                                borderLeft: "0",
                                                borderRight: '0',
                                                padding: '10px',
                                                fontWeight: 'bold',

                                            }} padding="none" align="left">
                                            <span className='font-bold'>
                                                <StatusMenu initialState={row.status} initialStatus={null}/></span>

                                            </TableCell>
                                            <TableCell sx={{
                                                border: '1px solid #ccc',
                                                borderLeft: "0",
                                                borderTopRightRadius: '4px',
                                                borderBottomRightRadius: '4px',

                                            }} padding="none" align="left">



                                                <LongMenu
                                                    data={fetchLeadData}
                                                    id={row.id}/>
                                            </TableCell>

                                        </TableRow>
                                    );
                                })}

                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
                <TablePagination
                    rowsPerPageOptions={[5, 7, 10]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Box>
        </>
    );
}