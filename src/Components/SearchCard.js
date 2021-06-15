import React, { useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, TextField, Button } from '@material-ui/core';

import Config from '../config.json';

const useStyle = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(8),
        textAlign: 'center'
    },
    text: {
        marginTop: theme.spacing(4)
    },
    button: {
        marginTop: theme.spacing(4),
    }
}))

function SearchCard(props) {
    const { setRes, setIdCheck, setId } = props;
    const classes = useStyle();
    const idRef = useRef('');
    const [idErr, setIdErr] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`${Config.url}/borrow/check`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                passport_id: idRef.current.value
            })
        })
            .then(res => {
                if (res.ok) {
                    res.json().then((data) => ({
                        data: data,
                        status: res.status
                    })).then((res) => {
                        setId(idRef.current.value);
                        setIdCheck(true);
                        setIdErr(false);
                        setRes(res.data);
                    })
                }
                else {
                    setIdErr(true);
                    setIdCheck(false);
                }
            })
    }
    return (
        <Container component="main" maxWidth='xs' className={classes.root}>
            <Typography variant='h5' component='h1'>指定借书证</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    className={classes.text}
                    required
                    fullWidth
                    label='卡号'
                    inputRef={idRef}
                    error={idErr}
                    helperText={(!idErr) ? '' : '用户不存在'}
                ></TextField>
                <Button
                    type='submit'
                    className={classes.button}
                    variant='contained'
                    color='primary'>确定</Button>
            </form>
        </Container>
    )
}

export default SearchCard;