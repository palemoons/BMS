import React, { useState, useRef } from 'react';
import { Paper, Grid, TextField, Button, InputLabel, Select, MenuItem, makeStyles, Typography, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import Config from '../config.json';

const useStyle = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
    form: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    select: {
        textAlign: 'center'
    }
}))

function BorrowBar(props) {
    const classes = useStyle();
    const { id, res, setRes } = props;
    const book_idRef = useRef('');
    const [type, setType] = useState('借书');
    const [mesOpen, setMesOpen] = useState(false);
    const [mesStatus, setMesStatus] = useState('');//exists: 已借该书, notExists: 不存在, success: 借书成功, error: 服务器出错
    const [errMes, setErrMes] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        let exists = false;
        res.forEach((value) => {
            if (value.book_id === book_idRef.current.value) exists = true;
        })
        if (type === '借书' && exists) {
            setMesOpen(true);
            setMesStatus('exists');
        }
        else if (type === '还书' && !exists) {
            setMesOpen(true);
            setMesStatus('notExists');
        }
        else {
            fetch(`${Config.url}/borrow/${(type === '借书') ? 'borrow' : 'return'}`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    book_id: book_idRef.current.value,
                    passport_id: id
                })
            })
                .then((res) => {
                    setMesOpen(true);
                    if (res.ok) {
                        setMesStatus('success');
                        updateBookList();
                    }
                    else {
                        res.json().then((data) => ({ data: data }))
                            .then(res => {
                                setMesStatus('error');
                                setErrMes(res.data.err);
                            })

                    }
                })
        }

    }
    const handleAlertType = () => {
        if (mesStatus === 'notExists') return 'error';
        if (mesStatus === 'exists') return 'error';
        if (mesStatus === 'success') return 'success';
        if (mesStatus === 'error') return 'error';

    }
    const handleAlertMes = () => {
        if (mesStatus === 'exists') return '不可以重复借书';
        if (mesStatus === 'notExists') return '未借该书';
        if (mesStatus === 'success') return `${type}成功`;
        if (mesStatus === 'error') return errMes;
    }
    const updateBookList = () => {
        fetch(`${Config.url}/borrow/check`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                passport_id: id
            })
        })
            .then((res) => {
                res.json().then((data) => ({
                    data: data,
                    status: res.status
                })).then((res) => {
                    setRes(res.data);
                })
            })
    }
    return (
        <>
            <Snackbar
                open={mesOpen}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                autoHideDuration={2500}
                onClose={() => { setMesOpen(false) }}>
                <MuiAlert
                    variant='filled'
                    severity={handleAlertType(mesStatus)}
                >
                    {handleAlertMes(mesStatus)}
                </MuiAlert>
            </Snackbar>
            <Paper className={classes.root}>
                <Typography variant='h5' component='h1'>{`借书证号：${id}`}</Typography>
                <form onSubmit={handleSubmit} className={classes.form}>
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={2} className={classes.select}>
                            <InputLabel id='act'>选择操作</InputLabel>
                            <Select
                                labelId='act'
                                fullWidth
                                value={type}
                                onChange={(e) => { setType(e.target.value) }}
                            >
                                <MenuItem value='借书'>借书</MenuItem>
                                <MenuItem value='还书'>还书</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                label='书号'
                                required
                                fullWidth
                                inputRef={book_idRef}
                            />
                        </Grid>
                        <Grid item>
                            <Button
                                type='submit'
                                variant='contained'
                                color='primary'>
                                确认
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </>
    )
}

export default BorrowBar;