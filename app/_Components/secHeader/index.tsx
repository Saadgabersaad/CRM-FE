'use client'
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import {usePathname} from "next/navigation";
import { useView} from "@/app/context/toggleContext";
import {useState} from "react";
import ViewAgendaOutlinedIcon from '@mui/icons-material/ViewAgendaOutlined';
import ViewAgendaIcon from '@mui/icons-material/ViewAgenda';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));



const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '26ch',
            '&:focus': {
                width: '30ch',
            },
        },
    },
}));

    export default function SearchAppBar() {
        const pathname = usePathname()
        const {view , setView} = useView();
        const [activeButton, setActiveButton] = useState(view);

        const handleViewOneClick = () => {
            setActiveButton('viewOne');
            setView('viewOne');
            console.log(view )
        };
        const handleViewTwoClick = () => {
            setActiveButton('viewTwo');
            setView('viewTwo');
            console.log(view )
        };

        // This effect will be triggered every time the view changes

        return (
        <Box sx={{ width:'100%',right:'0',zIndex:'50',paddingLeft:'0px' }}>
            <AppBar position="static" color='transparent'  style={{boxShadow:'none'}}>

                <Toolbar className='flex  items-center'>

                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        {/*<SelectedButton onFilter={handleFilter} />*/}


                    </Typography>

                    {(pathname==='/leads' || pathname==='/accounts') && (<div className={'flex gap-2 '}>

                        <button
                            onClick={handleViewTwoClick}
                            className={`p-3 ${activeButton === 'viewTwo' ? 'secondaryColor mainColor rounded-lg' : 'text-color'}`}
                        >
                            <FormatListBulletedRoundedIcon/>

                        </button>
                        <button
                            onClick={handleViewOneClick}
                            className={`p-3 ${activeButton === 'viewOne' ? 'secondaryColor mainColor rounded-lg' : 'text-color'}`}
                        >
                            {activeButton === 'viewOne' ? <ViewAgendaIcon/> : <ViewAgendaOutlinedIcon/>}

                        </button>
                    </div>)}

                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon color='disabled'/>
                        </SearchIconWrapper>
                        <StyledInputBase className='border rounded-md    h-[50px] border-gray-300'
                                         placeholder="Search…"
                                         inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>

                </Toolbar>

            </AppBar>
        </Box>
    );
}
