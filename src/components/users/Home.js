import React from 'react';
import clsx from 'clsx';
import { makeStyles, } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import HistoryIcon from '@material-ui/icons/History';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import ReceiptIcon from '@material-ui/icons/Receipt';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import History from './History';
import Admin from '../admins/Admin';
import NewInvoice from './New Invoice/NewInvoice';
import Stock from '../admins/Stock';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { AuthContext } from '../Contexts/AuthContext';
import AddUser from '../admins/AddUser';
import Login from './Login';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));


export default function Home() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [selected, setSelected] = React.useState(1);
    const [isFirstUse, setIsFirstUse] = React.useState(false);
    const [refresh, setRefresh] = React.useState(false);
    const [logout, setLogout] = React.useState(false);
    
    const { user, ChangeUser } = React.useContext(AuthContext)

    function LogUserOut() {
         setLogout(false);
         ChangeUser(null)
         
    }

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const options = [
        {
            text: 'New Invoice',
            icon: <AddCircleIcon fontSize='large' />
        },
        {
            text: 'History',
            icon: <HistoryIcon />
        },
        {
            text: 'Stock',
            icon: <ReceiptIcon />
        },
        {
            text: 'Settings',
            icon: <SettingsIcon />
        },
    ]

    const titles = ['Create New Invoice', 'Invoice History', 'Inventory', 'Settings', 'Logout', ]

    function SelectedComponent() {
        switch (selected) {
            case 0:
                return <NewInvoice />
            case 1:
                return <History />
            case 2:
                return <Stock />
            case 3:
                return <Admin />

            default:
                return <h1>Fallback</h1>
        }
    }

    React.useEffect(() => {
        setIsFirstUse(!(!!localStorage.getItem('users')))
    }, [refresh])

   

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar variant="dense">
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        {titles[selected]}
                    </Typography>

                    {user && <Typography variant="h6" noWrap style={{ position: 'absolute', right: '10px' }}>
                        {`${user.firstName} ${user.otherNames}`}
                    </Typography>}

                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.toolbar}>

                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />  View Less
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {
                        options.map((item, index) => {

                            return <ListItem button key={item.text} onClick={() => setSelected(index)} selected={index === selected}>
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItem>
                        })
                    }
                    <ListItem button key={'logout234'} onClick={()=>setLogout(true)}>
                        <ListItemIcon>
                            <ExitToAppIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Log Out"} />
                    </ListItem>
                </List>

                <Dialog open={logout} onClose={() => setLogout(false)}>
                    <DialogTitle>Do you want to logout</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            If you want to log out, click Logout below.
                             Otherwise, click cancel to close this dialog.
                            
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={LogUserOut}>Logout</Button>
                        <Button color="primary" onClick={()=>setLogout(false)}>Cancel</Button>
                    </DialogActions>
            </Dialog>

            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {
                    SelectedComponent()
                }
            </main>

            <Dialog open={!(!!user)}>
                <DialogTitle>{isFirstUse ? 'New User. Please create admin account' : 'Please Login to use this software'}</DialogTitle>
                <DialogContent>
                    {isFirstUse && <AddUser refreshFunction={setRefresh} isFirstUse={isFirstUse} />}
                    {!user && !isFirstUse && <Login />}
                </DialogContent>
            </Dialog>
        </div>
    );
}
