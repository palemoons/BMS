import React, { useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import BookmarksRoundedIcon from '@material-ui/icons/BookmarksRounded';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Config from '../config.json';


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.dark,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignIn() {
    const consolePath = '/console';
    const history = useHistory();
    const classes = useStyles();
    const userRef = useRef(), pwdRef = useRef();
    const [loginErr, setLoginErr] = useState(false);

    function handleSubmit(event) {
        event.preventDefault();
        fetch(`${Config.url}/login`, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({
                "user": userRef.current.value,
                "pwd": pwdRef.current.value
            }),
            headers: {
                'content-type': 'application/json'
            },
        })
            .then(res => {
                if (res.ok) {
                    setLoginErr(false);
                    history.push(consolePath);
                }
                else {
                    setLoginErr(true);
                }
            })
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <Link to="/">
                        <BookmarksRoundedIcon style={{ color: 'white' }} />
                    </Link>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <TextField
                        inputRef={userRef}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoFocus
                        error={loginErr ? true : false}

                    />
                    <TextField
                        inputRef={pwdRef}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        error={loginErr ? true : false}
                        helperText={loginErr ? 'Invalid username or password' : false}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>

                </form>
            </div>
        </Container>
    );
}