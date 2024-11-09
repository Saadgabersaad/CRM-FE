import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';




function createData(
    name: string,

) {
    return {
        name,

        history: [
            {
                date: '2020-01-05',
                customerId: '11091700',
                amount: 3,
            },
            {
                date: '2020-01-02',
                customerId: 'Anonymous',
                amount: 1,
            },
        ],
    };
}




function Row(props: { row: ReturnType<typeof createData> }) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const [checked, setChecked] = React.useState(true);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };
    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>

                <TableCell className='mainColor font-bold text-[16px]' component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell sx={{padding:'0'}}>
                    <IconButton
                        className='mainColor'
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon fontSize='medium' /> : <KeyboardArrowDownIcon fontSize='medium'  />}
                    </IconButton>
                </TableCell>
            </TableRow>



            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">

                                History
                            </Typography>

                            <Table size="small" padding={'none'} aria-label="purchases">
                                <TableHead >
                                    <TableRow>
                                        <TableCell>
                                            <FormGroup className='dark80'>
                                                <FormControlLabel control={<Checkbox defaultChecked />} label="All" />
                                                <FormControlLabel  control={<Checkbox />} label="Website" />
                                                <FormControlLabel  control={<Checkbox />} label="Referral" />
                                                <FormControlLabel  control={<Checkbox />} label="Event" />
                                             </FormGroup>
                                        </TableCell>
                                    </TableRow>

                                </TableHead>


                                <TableBody>


                                    {row.history.map((historyRow) => (
                                        <TableRow key={historyRow.date}>
                                            <TableCell component="th" scope="row">
                                                {historyRow.date}
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
    createData('Source'),
    createData('Lead Status'),
    createData('Interest Level'),
    createData('Field'),
    createData('Assigned to'),
];
export default function CollapsibleTable() {
    return (
        <TableContainer
        >
            <Table aria-label="collapsible table">

                <TableBody>
                    {rows.map((row) => (
                        <Row  key={row.name} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
