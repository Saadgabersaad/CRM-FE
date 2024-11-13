

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
import {Phone, Mail, ArrowUp,ArrowDown} from "lucide-react";
import ClientMenu from "../../_Components/popUpMenu/clientMenu";
import StatusMenu from "../../_Components/popUpMenu/statusMenu";
import LongMenu from "../../_Components/option";
import TablePagination from '@mui/material/TablePagination';
import SearchAppBar from "../../_Components/secHeader";
import SelectedButton from "@/app/_Components/secHeader/groupButton";
import {useEffect, useMemo, useState} from "react";
import ApiService from "@/app/services/api.service";
import ResetFilter from "@/app/customers/resetFilter";
import {useIDContext} from "@/app/context/customerIdProvider";


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
        label: 'Leads Name',
    },

    {
        id: 'phone',
        numeric: false,
        disablePadding: false,
        label: 'Contact Information',
    },
    {
        id: 'interest_level',
        numeric: false,
        disablePadding: false,
        label: 'Interest Level',
    },
    {
        id: 'source',
        numeric: true,
        disablePadding: false,
        label: 'Source',
    },
    {
        id: 'assigned_to',
        numeric: true,
        disablePadding: false,
        label: 'Assigned to',
    }, {
        id: 'status',
        numeric: true,
        disablePadding: false,
        label: 'Status',
    }, {

        id: 'created',
        numeric: true,
        disablePadding: false,
        label: 'Created at',
    },


];

interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
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
        <Toolbar  sx={[
                {
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                },
                numSelected > 0
            ]}>
        </Toolbar>
    );
}

export default function LeadsviewTwo() {
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof Data>('name');
    const [selected, setSelected] = React.useState<readonly number[]>([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
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
            console.log(data)
        } catch (error) {
            console.error('Failed to fetch customers:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {

        fetchLeadData();
    }, []);



    const handleRequestSort = React.useCallback(
        (event: React.MouseEvent<unknown>, property: keyof Data) => {
            const isAsc = orderBy === property && order === 'asc';
            setOrder(isAsc ? 'desc' : 'asc');
            setOrderBy(property);
        },
        [order, orderBy]
    );



    // const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     if (event.target.checked) {
    //         const newSelected = rows.map((n) => n.id);
    //         setSelected(newSelected);
    //         return;
    //     }
    //     setSelected([]);
    // };

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
    const visibleRows = useMemo(() => {
        let filteredRows = [...rows];
        if (statusFilter) filteredRows = filteredRows.filter(row => row.status=== statusFilter.toLowerCase());
        if (leadTypeFilter) filteredRows = filteredRows.filter(row => row.source === leadTypeFilter.toLowerCase());
        return filteredRows.sort(getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    }, [rows, statusFilter, leadTypeFilter, order, orderBy, page, rowsPerPage]);

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
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}

                        />

                        <TableBody>
                            {visibleRows.map((row, index) => {
                                const isItemSelected = selected.includes(row.id);
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

                                            {"00" + row.id}
                                        </TableCell>

                                        <TableCell
                                            sx={{
                                                border: '1px solid #ccc',
                                                borderLeft: "0",
                                                borderRight: '0',
                                                padding:'10px'
                                            }}
                                            component="th"
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
                                                padding: '10px'

                                            }}
                                            padding="normal"
                                            className='flex flex-col gap-1.5 justify-start'
                                            align="left">
                                            <span className='flex justify-start items-center gap-1.5'>
                                                <Phone className='mainColor'
                                                       size={16}
                                                       strokeWidth={2.5}/> {row.phone}</span>
                                            <span className='flex justify-start items-center gap-1.5'>
                                                <Mail className='mainColor' size={16}
                                                      strokeWidth={2.5}/>{row.email}</span>


                                        </TableCell>

                                        <TableCell
                                            sx={{
                                                maxWidth: '290px',
                                                border: '1px solid #ccc',
                                                borderLeft: "0",
                                                borderRight: '0',
                                                padding:'10px',
                                            }} padding="none"   align="left">
                                            <span className={`flex items-center gap-1.5 font-bold ${interestColor}`}>
                                            <ArrowIcon />
                                                {row.interest_level}
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
                                            <span className={`flex items-center gap-1.5 font-bold ${sourceColor}`}>

                                                {row.source}
                                            </span>

                                        </TableCell>


                                        <TableCell
                                            sx={{
                                                border: '1px solid #ccc',
                                                borderLeft: "0",
                                                borderRight: '0',
                                                padding:'10px'


                                            }} padding="none" align="left">
                                            <span>
                                                <ClientMenu assign={row.assigned_to}/></span>
                                        </TableCell>

                                        <TableCell sx={{
                                            border: '1px solid #ccc',
                                            borderLeft: "0",
                                            borderRight: '0',
                                            padding:'10px',
                                            fontWeight:'bold',

                                        }} padding="none" align="left">
                                            <span className='font-bold'>
                                                <StatusMenu initialState={row.status}/></span>

                                        </TableCell>

                                        <TableCell
                                            sx={{
                                                border: '1px solid #ccc',
                                                borderLeft: "0",
                                                borderRight: "0",
                                                padding:'10px'

                                            }} padding="none" align="left">{row.created}</TableCell>

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