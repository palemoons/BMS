import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import BookmarksRoundedIcon from '@material-ui/icons/BookmarksRounded';

import Config from '../config.json';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: '100vh',
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign: 'center',
  },
  landingTitle: {
    marginTop: '20vh',
    textAlign: 'center',
  },
  searchButton: {
    margin: '25px',
  }
}));

function Landing() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const prevOpen = useRef(open);
  const [loginStatus, setLoginStatus] = useState(false);
  const [user, setUser] = useState('');

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

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

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
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
  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Link to="/">
            <IconButton edge="start" className={classes.icon} style={{ color: 'white' }}>
              <BookmarksRoundedIcon />
            </IconButton>
          </Link>
          <Typography variant="h5" className={classes.title}>
            Book Management System
          </Typography>
          {
            (loginStatus === true) ?
              <>
                <Button
                  ref={anchorRef}
                  aria-controls={open ? 'menu-list-grow' : undefined}
                  aria-haspopup="true"
                  onClick={handleToggle}
                  style={{ color: 'white' }}
                >
                  {user}
                </Button>
                <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                    >
                      <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                          <MenuList autoFocusItem={open} id="menu-list-grow">
                            <MenuItem>
                              <Link
                                style={{ color: 'inherit' }}
                                to='/console'>
                                Console
                              </Link>
                            </MenuItem>
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </>
              :
              <Link to="/login">
                <Button style={{ color: 'white' }}>Login</Button>
              </Link>
          }
        </Toolbar>
      </AppBar>
      <Container className={classes.landingTitle}>
        <Typography variant="h1">
          BMS
      </Typography>
        <Typography variant="subtitle1">
          Project for Database System Concept
      </Typography>
        <Link to="/query">
          <Button variant="contained" color="primary" className={classes.searchButton}>
            查询图书
          </Button>
        </Link>
      </Container>
    </div>
  );
}

export default Landing;
