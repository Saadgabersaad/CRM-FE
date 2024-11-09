import * as React from 'react';
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
import Logo from "../../assets/beed83bf6aee26c5540858387e08bd9a.jpeg"
import { Mail } from 'lucide-react';
function createData(
    name: string,
    calories: string,
    fat: string,
    carbs: string,
    protein: string,
    price: string,
) {
    return {
        name,
        calories,
        fat,
        carbs,
        protein,
        price,
        history: [
            {
                ID: '01',
                customerId: '11091700',
                amount: 3,
            },
            {
                ID: '02',
                customerId: 'Anonymous',
                amount: 1,
            },
        ],
    };
}

function Row(props: { row: ReturnType<typeof createData> }) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow
                className='tertiary-color rounded-full   shadows ' >
                <TableCell   sx={{
                    border: '1px solid #E4E4E4',
                    borderRight: "0",
                    borderTopLeftRadius: '4px',
                    borderBottomLeftRadius: '4px',
                    height:'88px'

                }}>
                    <IconButton

                        className='text-primary'
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowDownIcon  /> : <KeyboardArrowRightIcon />}
                    </IconButton>
                </TableCell>
                <TableCell
                    className='text-primary text-[24px]'
                    sx={{
                        border: '1px solid #E4E4E4',
                        borderLeft: "0",
                        borderRight: '0',
                    }}
                    component="th" scope="row">
                    {row.name}
                </TableCell>

                <TableCell
                    sx={{
                        border: '1px solid #E4E4E4',
                        borderLeft: "0",
                        borderRight: '0',

                    }}

                    align="left">
                    <span className='text-primary'> $ Revenue : </span>
                    {row.calories}</TableCell>
                <TableCell
                    sx={{
                        border: '1px solid #E4E4E4',
                        borderLeft: "0",
                        borderRight: '0',
                        width:'fit-content',
                        height:'fit-content',
                         padding:'8px',
                        backgroundColor:row.fat==='active' ?'#ccf0eb' :'#e0d4fc',
                        color:row.fat==='active' ? '#00B69B':'#6226EF',
                    }}
                    align="left">
                    <div> {row.fat} </div>
                   </TableCell>
                <TableCell
                    sx={{


                    }}
                    align="left">{row.carbs}</TableCell>
                <TableCell sx={{
                    border: '1px solid #E4E4E4',
                    borderLeft: "0",
                    borderTopRightRadius: '4px',
                    borderBottomRightRadius: '4px',

                }}  align="left">{row.protein}</TableCell>
            </TableRow>


            <TableRow >
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <div>
                                <span className='text-primary'>Assigned To :  </span> <span>TODO</span>
                            </div>
                            <Typography variant="h6" gutterBottom component="div">
                                Related Contacts
                            </Typography>
                            <Table
                                sx={{ borderColor:'white ', borderSpacing: '0 10px', borderCollapse: 'separate'}}
                                size="medium" aria-label="purchases">


                                <TableBody >
                                    {row.history.map((historyRow) => (
                                        <TableRow sx={{border:'none'}}  key={historyRow.ID}>
                                            <TableCell
                                                sx={{
                                                    border: '1px solid #E4E4E4',
                                                    borderRight: "0",
                                                    borderTopLeftRadius: '4px',
                                                    borderBottomLeftRadius: '4px',

                                                }}
                                                component="th" scope="row">
                                                <span className='text-primary'>
                                                    ID :
                                                </span>
                                                {historyRow.ID}
                                            </TableCell>


                                            <TableCell
                                                sx={{
                                                    border: '1px solid #E4E4E4',
                                                    borderLeft: "0",
                                                    borderRight: '0',
                                                }}
                                            >
                                                <div className='row'
                                                >
                                                    <div style={{width: '28px', height: '28px'}}><Image
                                                        className='rounded-full' src={Logo} alt='profiel'/></div>
                                                    <div>{historyRow.customerId}</div>
                                                </div>

                                            </TableCell>

                                            <TableCell
                                            sx={{
                                                border: '1px solid #E4E4E4',
                                                borderLeft: "0",
                                                borderRight: '0',
                                            }}
                                        >
                                            <div className='row'
                                            >
                                                <div >
                                                    Product Designer at <span className='text-primary'> {historyRow.customerId}</span>
                                                </div>

                                            </div>

                                        </TableCell>

                                            <TableCell
                                                sx={{
                                                    border: '1px solid #E4E4E4',
                                                    borderLeft: "0",
                                                    borderRight: '0',
                                                }}
                                                align="left">
                                               <div className='row'>
                                                   <Mail/>
                                                  <a href='https://saad.agber1994@gmail.com' target='_blank'> saad.gaber1994@gmail.com</a> {historyRow.amount}</div>

                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    border: '1px solid #E4E4E4',
                                                    borderLeft: "0",
                                                    borderRight: '1px solid #E4E4E4',
                                                    borderRadius:'5px'
                                                }}
                                                align="left">
                                                {/*{Math.round(historyRow.amount * row.price * 100) / 100}*/}
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



const rows = [
    createData('Frozen yoghurt', "1000001",'inactive',' 24', '4.0', '3.99'),
    createData('Ice cream sandwich', "237", 'active', "37", "4.3", "4.99"),
    createData('Eclair', "262", 'inactive', "24", "6.0", "3.79"),
    createData('Cupcake', "305", 'active', "67", "4.3", "2.5"),
    createData('Gingerbread', "356", 'inactive', "49", "3.9", "1.5"),
];

export default function CollapsibleTable() {
    return (
        <TableContainer sx={{border:'none'}} >
            <Table   sx={{ borderColor:'white ', borderSpacing: '0 10px', borderCollapse: 'separate'}}

                     aria-label="collapsible table">

                <TableBody >
                    {rows.map((row) => (
                        <Row   key={row.name} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
