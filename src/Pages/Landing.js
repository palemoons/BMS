import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
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
  const [loginStatus, setLoginStatus] = useState(false);
  const [user, setUser] = useState('');
  useEffect(() => {
    fetch(`${Config.url}`, {
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
          console.log(result);
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
              <Button style={{color: 'white'}}>{`Welcome, ${user}`}</Button>
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
