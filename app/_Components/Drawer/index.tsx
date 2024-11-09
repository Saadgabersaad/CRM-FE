
import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SelectedListItem from "../SideBarList";
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import Logo from "../../assets/languageLogo.png"
import Logog from "../../assets/languageLogoFull.jpg"
import Image from "next/image";



const drawerWidth = 185;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,

    }),
    variants: [
        {
            props: ({ open }) => open,
            style: {
                marginLeft: drawerWidth,
                width: `calc(100% - ${drawerWidth}px)`,
                transition: theme.transitions.create(['width', 'margin'], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            },
        },
    ],
}));

const Index = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        variants: [
            {
                props: ({ open }) => open,
                style: {
                    ...openedMixin(theme),
                    '& .MuiDrawer-paper': openedMixin(theme),
                },
            },
            {
                props: ({ open }) => !open,
                style: {
                    ...closedMixin(theme),
                    '& .MuiDrawer-paper': closedMixin(theme),
                },
            },
        ],
    }),
);

export default function MiniDrawer() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex',flexDirection: 'column',alignItems:'center',zIndex:'10'}}>
            <CssBaseline />
            <AppBar  style={{boxShadow:'none',backgroundColor:'transparent' ,paddingTop:'20px',left:'0',width:'fit-content'}}  position="fixed" open={open} >

             <div >
                 <Toolbar sx={{display:'flex',alignItems:'start' ,flexDirection:'row',gap:'25px'}}
                 >
                     <IconButton
                         color="default"
                         aria-label="open drawer"
                         onClick={handleDrawerOpen}
                         edge="start"
                         sx={[
                             { display:'flex',
                                 flexDirection: 'column',
                                 alignItems:'start',
                                 padding:'0 8px'

                             },
                             open && { display: 'none' },
                         ]}
                     >

                         <Image src={Logo} alt="Logo"  className='w-[30px] h-[30px] w overflow-clip'  />

                         <MenuIcon />

                     </IconButton>
                 </Toolbar>
             </div>
            </AppBar>


            <Index  variant="permanent" open={open}>
                {!open?'':<Image src={Logog} alt="Logo" style={{paddingTop: '20px',zIndex:'1'}}/>}

                <DrawerHeader
                    sx={
                    [!open && {paddingTop: '50px', }]
                }
                >

                    <IconButton
                        sx={

                           [ !open && { display: 'none' }]
                        }
                        onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <MenuOpenIcon /> : <MenuOpenIcon />}
                    </IconButton>
                </DrawerHeader>

                <SelectedListItem/>
            </Index>
        </Box>

    );
}
