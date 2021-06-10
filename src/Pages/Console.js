import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
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
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
import AddIcon from '@material-ui/icons/Add';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import SearchIcon from '@material-ui/icons/Search';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { ClickAwayListener, MenuItem, MenuList, Popper } from '@material-ui/core';

import ImportBook from '../Components/ImportBook';
import ManageBook from '../Components/ManageBook';
import SearchBook from '../Components/SearchBook';
import ManageCard from '../Components/ManageCard';
import Config from '../config.json';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    title: {
        flexGrow: 1,
        textAlign: 'center'
    }
    ,
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
    menuItem: {
        display: 'flex',

    }
    ,
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


function Console() {
    const classes = useStyles();
    const anchorRef = useRef(null);
    const [userOpen, setUserOpen] = useState(false);
    const prevOpen = useRef(userOpen);
    const [open, setOpen] = useState(false);
    const [loginStatus, setLoginStatus] = useState(true);
    const [user, setUser] = useState('');
    const [menuIndex, setMenuIndex] = useState(0);

    useEffect(() => {
        if (prevOpen.current === true && userOpen === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = userOpen;
        fetch(`${Config.url}/check`, {
            'method': 'GET',
            'headers': {
                'content-type': 'application/json'
            },
            'credentials': 'include'
        })
            .then(res => {
                return res.json();
            })
            .then((result) => {
                if (result.loginStatus === 'true') {
                    setLoginStatus(true);
                    setUser(result.iss);
                }
                else {
                    setLoginStatus(false);
                    setUser('');
                }
            })
    })

    const handleToggle = () => {
        setUserOpen((prevOpen) => (!prevOpen));
    }

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setUserOpen(false);
    };

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleLogout = (event) => {
        event.preventDefault();
        fetch(`${Config.url}/login/quit`, {
            header: {
                'content-type': 'application/json'
            },
            method: 'GET',
            credentials: 'include'
        })
            .then(() => {
                setLoginStatus(false);
                setUser('');
            })
            .catch(() => alert('与服务器连接时发生错误'))
    }

    const indexSwitch = (index) => {
        switch (index) {
            case 0: return <ImportBook />;
            case 1: return <SearchBook />;
            case 2: return <ManageBook />;
            case 3: return <ManageCard />;
            default: alert('index处于未知状态，请联系管理员'); return;
        }
    }
    return (
        <div className={classes.root}>
            <CssBaseline />
            <Dialog
                open={!loginStatus}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>Error</DialogContent>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        登录会话已超时，请重新登录！
          </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="primary">
                        <Link to='/'>
                            确定
            </Link>
                    </Button>
                </DialogActions>
            </Dialog>
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
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
                    <Typography variant="h6" noWrap className={classes.title}>
                        Book Management System
                    </Typography>
                    <Button
                        ref={anchorRef}
                        aria-describedby='userPopper'
                        type='button'
                        onClick={handleToggle}
                        style={{ color: 'white' }}>
                        {user}
                    </Button>
                    <Popper
                        id='userPopper'
                        open={userOpen}
                        disablePortal
                        anchorEl={anchorRef.current}>
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList autoFocusItem={userOpen} id="menu-list-grow">
                                    <MenuItem>
                                        <Link
                                            to='/'
                                            className={classes.menuItem}
                                            style={{ color: 'inherit' }}>
                                            <HomeIcon />
                                            Homepage
                                </Link>
                                    </MenuItem>
                                    <MenuItem
                                        onClick={handleLogout}
                                        className={classes.menuItem}>
                                        <ExitToAppIcon />
                                        Logout
                                </MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Popper>
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
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <ListItem button key='图书入库' onClick={() => { setMenuIndex(0) }}>
                        <ListItemIcon>
                            <AddIcon />
                        </ListItemIcon>
                        <ListItemText primary='图书入库' />
                    </ListItem>
                    <ListItem button key='图书查询' onClick={() => { setMenuIndex(1) }}>
                        <ListItemIcon>
                            <SearchIcon />
                        </ListItemIcon>
                        <ListItemText primary='图书查询' />
                    </ListItem>
                    <ListItem button key='借还书籍' onClick={() => { setMenuIndex(2) }}>
                        <ListItemIcon>
                            <ImportExportIcon />
                        </ListItemIcon>
                        <ListItemText primary='借还书籍' />
                    </ListItem>
                    <ListItem button key='借书证管理' onClick={() => { setMenuIndex(3) }}>
                        <ListItemIcon>
                            <AssignmentIndIcon />
                        </ListItemIcon>
                        <ListItemText primary='借书证管理' />
                    </ListItem>
                </List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {
                    indexSwitch(menuIndex)
                }
            </main>
        </div>
    )
}

export default Console;