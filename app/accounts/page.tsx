'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import SplitButton from "@/app/customers/filters";
import {Phone, Mail} from "lucide-react";
import LongMenu from "../_Components/option";
import TablePagination from '@mui/material/TablePagination';
import SearchAppBar from "../_Components/secHeader";
import SelectedButton from "@/app/_Components/secHeader/groupButton";
import {useEffect, useState} from "react";
import ApiService from "@/app/services/api.service";
import ResetFilter from "@/app/customers/resetFilter";
import {useIDContext} from "@/app/context/customerIdProvider";


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
    contacts: Contact[]; // Array of Contact objects
    assigned_to: string;
}

export function createData(
    id: number,
    name: string,
    industry: number,
    annual_revenue: string,
    status: string,
    comment: string,
    contacts: Contact[], // Array of Contact objects
    assigned_to: string
): Data {
    return {
        id,
        name,
        industry,
        annual_revenue,
        status,
        comment,
        contacts, // Added contacts here
        assigned_to,
    };
}


function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof never>(
    order: Order,
    orderBy: Key,
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    numeric: boolean;
}

const headCells: readonly HeadCell[] = [
    {
        id: 'id',
        numeric: true,
        disablePadding: true,
        label: 'ID',
    },
    {
        id: 'name',
        numeric: true,
        disablePadding: true,
        label: 'Company Name',
    },
    {
        id: 'contacts.name',
        numeric: true,
        disablePadding: true,
        label: 'Contact Name',
    },
    {
        id: 'contacts',
        numeric: false,
        disablePadding: false,
        label: 'Contact Information',
    },

    {
        id: 'assigned_to',
        numeric: true,
        disablePadding: false,
        label: 'Assigned to',
    },
    {
        id: 'status',
        numeric: true,
        disablePadding: false,
        label: 'Status',
    }, {
        id: 'industry',
        numeric: true,
        disablePadding: false,
        label: 'Industry',
    }, {

        id: 'annual_revenue',
        numeric: true,
        disablePadding: false,
        label: 'Revenue',
    },


];

interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const { order, orderBy,  onRequestSort } = props;
    const createSortHandler =
        (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);

        };

    return (
        <TableHead >
            <TableRow >

                {headCells.map((headCell) => (
                    <TableCell
                        sx={{ border: '1px solid #ccc',
                            borderRight:"0",
                            borderLeft:"0",
                            backgroundColor:'#F9FAFC',
                            padding: '10px'}}
                        key={headCell.id}
                        align={headCell.numeric ? 'left' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            // color off arrow
                            // active={orderBy === headCell.id}
                            active={true}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span"
                                     sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>

                    </TableCell>
                ))}
                <TableCell padding="checkbox"   sx={{ border: '1px solid #ccc',
                    borderLeft:"0",
                    borderTopRightRadius: '4px',
                    borderBottomRightRadius: '4px',
                    backgroundColor:'#F9FAFC',
                }}>

                </TableCell>
            </TableRow>
        </TableHead>
    );
}
interface EnhancedTableToolbarProps {
    numSelected: number;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
    const { numSelected } = props;
    return (
        <Toolbar
            sx={[
                {
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                },
                numSelected > 0
            ]}
        >




        </Toolbar>
    );
}

export default function Leads() {
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof Data>('name');
    const [selected, setSelected] = React.useState<readonly number[]>([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [rows, setRows] = useState<Data[]>([]);
    const [loading, setLoading] = useState(true);
    const {setSelectedId} = useIDContext(); // Access context to set selected ID


    const fetchAccountsData = async () => {
        try {
            const response = await ApiService.getAccounts();
            const data = response.data.data.map((item:any) =>
                createData(
                    item.id,
                    item.name,
                    item.industry,
                    item.annual_revenue,
                    item.status,
                    item.comment,
                    item.contacts,
                    item.assigned_to,
                )
            );
            setRows(data);
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {

        fetchAccountsData();
    }, []);



    const handleRequestSort = React.useCallback(
        (event: React.MouseEvent<unknown>, property: keyof Data) => {
            const isAsc = orderBy === property && order === 'asc';
            setOrder(isAsc ? 'desc' : 'asc');
            setOrderBy(property);
        },
        [order, orderBy]
    );



    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

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
    const [leadTypeFilter, setLeadTypeFilter] = React.useState('');
    const visibleRows: Data[] = React.useMemo(():Data[] => {

        let processedRow = [...rows];

        if (statusFilter !== '') {
            processedRow = processedRow.filter((row: Data) => row.status == statusFilter);
            console.log(statusFilter)
        }


        return processedRow
            .sort(getComparator(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    }, [rows,statusFilter, leadTypeFilter, order, orderBy, page, rowsPerPage]);

    const handleResetFilters = () => {
        setStatusFilter("");
        setLeadTypeFilter("");
        setRows(rows);
        setPage(0);
    };

    if (loading) return <div className='loader'></div>;


    return (
        <Box sx={{ width: '100%' }}>

            <div className='flex z-50 items-center'>
                <SelectedButton onFilter={setStatusFilter} />
                <SearchAppBar  />
            </div>

            <div className='flex flex-row items-center gap-3.5 h-10 shadow  my-5' >

                <EnhancedTableToolbar numSelected={selected.length} />
                <SplitButton onFilters={setLeadTypeFilter}/>
                <ResetFilter  onReset={handleResetFilters}/>

            </div>

            <Paper sx={{ width: '100%', mb: 2 }}>

                <TableContainer>
                    <Table
                        sx={{borderSpacing: '0 5px', borderCollapse: 'separate', minWidth: 750}}
                        aria-labelledby="tableTitle"

                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}

                        />

                        <TableBody>
                            {visibleRows.map((row, index) => {
                                const isItemSelected = selected.includes(row.id);
                                const labelId = `enhanced-table-checkbox-${index}`;


                                return (
                                    <TableRow

                                        hover
                                        onClick={(event) => handleClick(event, row.id)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.id}
                                        selected={isItemSelected}
                                        sx={{cursor: 'pointer'}}
                                    >

                                        <TableCell
                                            sx={{
                                                border: '1px solid #ccc',
                                                borderRight: "0",
                                                borderTopLeftRadius: '4px',
                                                borderBottomLeftRadius: '4px',

                                            }}
                                            align="left"
                                        >

                                            {row.id}
                                        </TableCell>

                                        <TableCell
                                            sx={{
                                                border: '1px solid #ccc',
                                                borderLeft: "0",
                                                borderRight: '0',
                                                padding:'10px'
                                            }}
                                            id={labelId}
                                            scope="row"
                                            padding="none"
                                            align="left"
                                        >
                                            {row.name}
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                border: '1px solid #ccc',
                                                borderLeft: "0",
                                                borderRight: '0',
                                                padding:'10px'
                                            }}
                                            id={labelId}
                                            scope="row"
                                            padding="none"
                                            align="left"
                                        >
                                            {row.contacts.map((contact) => (
                                                <Box key={contact.id} sx={{ mb: 1 }}>
                                                    <strong>{contact.name}</strong> <br />
                                                    <span className='text-color'> {contact.position}</span>
                                                </Box>
                                            ))}
                                        </TableCell>


                                        <TableCell
                                            sx={{
                                                border: '1px solid #ccc',
                                                borderLeft: "0",
                                                borderRight: '0',
                                                padding: '10px'

                                            }}
                                            id={labelId}

                                            padding="none"
                                            align="left">
                                            <div
                                                className='flex flex-col gap-1.5 justify-start'
                                            >
                                                {row.contacts.map((contact) => (
                                                    <Box key={contact.id} sx={{ mb: 1 }}>
                                                        <span className='flex justify-start items-center gap-1.5'>
                                                            <Phone className='text-color'
                                                                   size={16}
                                                                   strokeWidth={2.5}/>
                                                            {contact.phone}
                                                        </span>
                                                        <span className='flex justify-start items-center gap-1.5'>
                                                            <Mail className='text-color'
                                                                  size={16}
                                                                  strokeWidth={2.5}/>
                                                            {contact.email}
                                                        </span>
                                                    </Box>
                                                ))}

                                            </div>


                                        </TableCell>

                                        <TableCell
                                            sx={{
                                                maxWidth: '290px',
                                                border: '1px solid #ccc',
                                                borderLeft: "0",
                                                borderRight: '0',
                                                padding: '10px',
                                            }} padding="none" align="left">
                                            <span className='  font-bold bg-[#DDEAFB] py-2 px-4 rounded-lg mainColor ' >
                                                {row.assigned_to}
                                            </span>

                                        </TableCell>

                                        <TableCell
                                            sx={{
                                                maxWidth:'290px',
                                                border: '1px solid #ccc',
                                                borderLeft: "0",
                                                borderRight: '0',
                                                padding:'10px',

                                            }} padding="none"   align="left">
                                            <span className={`
                                            ${row.status ==='active'?'bg-[#ccf0eb]':'bg-red-400'}
                                            ${row.status ==='active'?'text-[#00B69B]':'text-[#EF3826]'}
                                             rounded flex justify-center items-center p-2 gap-1.5 font-bold `}>
                                                {row.status}
                                            </span>

                                        </TableCell>


                                        <TableCell sx={{
                                            border: '1px solid #ccc',
                                            borderLeft: "0",
                                            borderRight: '0',
                                            padding:'10px',
                                            fontWeight:'bold',

                                        }} padding="none" align="left">
                                            <span className='font-bold mainColor secondaryColor p-2 rounded'>
                                                {row.industry}</span>

                                        </TableCell>

                                        <TableCell
                                            sx={{
                                                border: '1px solid #ccc',
                                                borderLeft: "0",
                                                borderRight: "0",
                                                padding:'10px'

                                            }} padding="none" align="left">$ {row.annual_revenue}</TableCell>

                                        <TableCell sx={{
                                            border: '1px solid #ccc',
                                            borderLeft: "0",
                                            borderTopRightRadius: '4px',
                                            borderBottomRightRadius: '4px',

                                        }} padding="none" align="left">
                                            <LongMenu
                                                data={fetchAccountsData}
                                                id={row.id}/>
                                            {/*comment={row.field}*/}
                                        </TableCell>

                                    </TableRow>
                                );
                            })}

                        </TableBody>
                    </Table>
                </TableContainer>

                <TablePagination
                    rowsPerPageOptions={[5, 7, 10]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />

            </Paper>

        </Box>
    );
}
