import React, { useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Container, Paper, Grid, TextField, InputLabel, Select, MenuItem, Button, Snackbar, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Config from '../config.json';

const useStyle = makeStyles((theme) => ({
    title: {
        padding: theme.spacing(2),
        textAlign: 'center'
    }
}))
const useAddStyle = makeStyles((theme) => ({
    submit: {
        marginTop: theme.spacing(2),
    }
}))
const useDeleteStyle = makeStyles((theme) => ({
    submit: {
        marginTop: theme.spacing(2),
    }
}))

function AddCard() {
    const classes = useAddStyle();
    const name = useRef(''), Id = useRef(''), college = useRef('');
    const [type, setType] = useState('student');
    const [open, setOpen] = useState(false);
    const [mesStatus, setMesStatus] = useState('success');
    const [mes, setMes] = useState('');

    const handleAddSubmit = (e) => {
        e.preventDefault();
        fetch(`${Config.url}/card/add`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name.current.value,
                id: Id.current.value,
                college: college.current.value,
                type: type
            })
        })
            .then((res) => {
                if (res.ok) {
                    setMesStatus('success');
                    setMes('创建成功！');
                }
                else {
                    res.json().then((data) => ({ data: data }))
                        .then((res) => {
                            setMesStatus('error');
                            setMes(res.data.err);
                        })
                }
                setOpen(true);
            })
    }
    return (
        <>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={open}
                autoHideDuration={2500}
                onClose={() => { setOpen(false) }}
            >
                <MuiAlert variant='filled' severity={mesStatus}>
                    {mes}
                </MuiAlert>
            </Snackbar>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography>新增借书证</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Container maxWidth='sm'>
                        <form onSubmit={handleAddSubmit}>
                            <Grid container spacing={4}>
                                <Grid item xs={12}>
                                    <TextField
                                        variant='standard'
                                        label='姓名'
                                        required
                                        fullWidth
                                        inputRef={name}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant='standard'
                                        label='学号'
                                        required
                                        fullWidth
                                        inputRef={Id}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        variant='standard'
                                        label='学院'
                                        required
                                        fullWidth
                                        inputRef={college}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <InputLabel id='type'>类别</InputLabel>
                                    <Select
                                        fullWidth
                                        value={type}
                                        style={{ textAlign: 'center' }}
                                        onChange={(e) => { setType(e.target.value) }}>
                                        <MenuItem value='client'>教职工</MenuItem>
                                        <MenuItem value='student'>学生</MenuItem>
                                    </Select>
                                </Grid>
                            </Grid>
                            <Button
                                className={classes.submit}
                                variant='contained'
                                color='primary'
                                type='submit'>创建
                            </Button>
                        </form>
                    </Container>
                </AccordionDetails>
            </Accordion>
        </>
    )
}

function DeleteCard() {
    const classes = useDeleteStyle();
    const Id = useRef('');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const [mesStatus, setMesStatus] = useState('success');
    const [mes, setMes] = useState('');

    const handleDeleteSubmit = () => {
        fetch(`${Config.url}/card/delete`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: Id.current.value
            })
        })
            .then((res) => {
                if (res.ok) {
                    setMesStatus('success');
                    setMes('删除成功！');
                }
                else {
                    res.json().then((data) => ({ data: data }))
                        .then((res) => {
                            setMesStatus('error');
                            setMes(res.data.err);
                        })
                }
                setOpen(true);
            })
    }
    return (
        <>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={open}
                autoHideDuration={2500}
                onClose={() => { setOpen(false) }}
            >
                <MuiAlert variant='filled' severity={mesStatus}>
                    {mes}
                </MuiAlert>
            </Snackbar>
            <Dialog open={dialogOpen}>
                <DialogTitle>确认删除？</DialogTitle>
                <DialogContent>
                    <Typography>
                        在删除之前请确认该用户所借书籍已全部归还！
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { handleDeleteSubmit(); setDialogOpen(false) }}>确认</Button>
                    <Button onClick={() => { setDialogOpen(false) }}>取消</Button>
                </DialogActions>
            </Dialog>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography>删除借书证</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Container maxWidth='sm'>
                        <form>
                            <TextField
                                label='借书证号'
                                variant='standard'
                                fullWidth
                                required
                                inputRef={Id}
                            />
                            <Button
                                onClick={() => { setDialogOpen(true) }}
                                variant='contained'
                                color='primary'
                                className={classes.submit}
                            >
                                删除
                            </Button>
                        </form>
                    </Container>
                </AccordionDetails>
            </Accordion>
        </>
    )
}

function ManageCard() {
    const classes = useStyle();
    return (
        <>
            <Paper className={classes.title}>
                <Typography variant='h4' component='h1'>借书证管理</Typography>
            </Paper>
            <AddCard />
            <DeleteCard />
        </>
    )
}

export default ManageCard;