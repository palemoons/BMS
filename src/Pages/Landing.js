import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import BookmarksRoundedIcon from '@material-ui/icons/BookmarksRounded';

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
  searchButton:{
    margin: '25px',
  }
}));

function Landing() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton edge="start" className={classes.icon} color="inherit" href="/">
            <BookmarksRoundedIcon />
          </IconButton>
          <Typography variant="h5" className={classes.title}>
            Book Management System
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container className={classes.landingTitle}>
        <Typography variant="h1">
          BMS
      </Typography>
        <Typography variant="subtitle1">
          Project for Database System Concept
      </Typography>
        <Button variant="contained" color="primary" className={classes.searchButton}>
          查询图书
        </Button>
      </Container>
    </div>
  );
}

export default Landing;
