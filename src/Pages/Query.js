import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import BookmarksRoundedIcon from '@material-ui/icons/BookmarksRounded';

import SearchBook from '../Components/SearchBook';

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        textAlign: 'center',
    },
}));

function Query() {
    const classes = useStyles();
    return (
        <>
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
                </Toolbar>
            </AppBar>
            <SearchBook />
        </>
    )
}

export default Query;