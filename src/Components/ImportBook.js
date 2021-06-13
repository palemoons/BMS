import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import MuiAlert from '@material-ui/lab/Alert';
import { Button, Grid, Paper, TextField, Snackbar } from '@material-ui/core';

import Config from '../config.json';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 'auto',
        maxWidth: 1024,
        padding: theme.spacing(2)
    },
    title: {
        textAlign: 'center',
    },
    subtitle: {
        paddingTop: theme.spacing(8),
    },
    submit: {
        display: 'flex',
        flexDirection: 'row-reverse',
        '& .MuiButton-contained': {
            marginTop: theme.spacing(2),
        }
    }
}))

function ImportBook() {
    const isDouble2 = /^[0-9]+(.[0-9]{1,2})?$/;
    const isN = /^\d+$/;
    const classes = useStyles();
    const category = useRef(''), bookTitle = useRef(''), press = useRef(''), pubDate = useRef(''), author = useRef(''), price = useRef(''), total = useRef('');
    const [mesOpen, setMesOpen] = useState(false);
    const [pubErr, setPubErr] = useState(false);
    const [priceErr, setPriceErr] = useState(false);
    const [totalErr, setTotalErr] = useState(false);
    const [fileData, setFileData] = useState(null);
    const [singleSubmitStatus, setSingleSubmitStatus] = useState(false);
    const [fileSubmitStatus, setFileSubmitStatus] = useState(false);
    const [mesStatus, setMesStatus] = useState('none');//none: 无消息; single-success: 单本导入成功; single-error: 图书重名; file-success: 文件导入成功; file-error: 文件导入失败

    const handleSingleSubmit = (event) => {
        event.preventDefault();
        fetch(`${Config.url}/book/single-import`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                'category': category.current.value,
                'book_title': bookTitle.current.value,
                'press': press.current.value,
                'pub_date': pubDate.current.value,
                'author': author.current.value,
                'price': price.current.value,
                'total': total.current.value
            })
        })
            .then(res => {
                if (res.ok) setMesStatus('single-success');
                else setMesStatus('single-error');
                setMesOpen(true);
            })
    }
    const handleFileSubmit = (event) => {
        event.preventDefault();
        const fetchBody = new FormData();
        fetchBody.append('file', fileData);
        let options = {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            body: fetchBody
        };
        delete options.headers['Content-Type'];
        fetch(`${Config.url}/book/file-import`, options)
            .then((res) => {
                if (res.ok) setMesStatus('file-success');
                else setMesStatus('file-error');
                setMesOpen(true);
            })
    }
    const singleSubmitCheck = () => {
        (pubErr || priceErr || totalErr || category.current.value === '' || bookTitle.current.value === '' || author.current.value === '' || press.current.value === '' || pubDate.current.value === '' || price.current.value === '' || total.current.value === '')
            ?
            setSingleSubmitStatus(false)
            :
            setSingleSubmitStatus(true)
    }
    const handleAlertType = (mesStatus) => {
        switch (mesStatus) {
            case 'none': return 'success';
            case 'single-success': return 'success';
            case 'file-success': return 'success';
            case 'single-error': return 'error';
            case 'file-error': return 'error';
            default: return 'success';
        }
    }
    const handleAlertMes = (mesStatus) => {
        switch (mesStatus) {
            case 'none': return '';
            case 'single-success': return '导入成功';
            case 'file-success': return '批量导入成功';
            case 'single-error': return '导入失败：图书已存在';
            case 'file-error': return '文件导入失败：文件中有至少一本图书已存在';
            default: return '';
        }
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
                <Typography variant='h4' component='h1' className={classes.title}>导入书籍</Typography>
                <Typography variant='h5' component='h2' className={classes.subtitle}>单本入库</Typography>
                <form noValidate onSubmit={handleSingleSubmit} onChange={singleSubmitCheck}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                inputRef={bookTitle}
                                margin='normal'
                                label='书名'
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                inputRef={category}
                                margin='normal'
                                label='类别'
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                inputRef={author}
                                margin='normal'
                                label='作者'
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                inputRef={press}
                                margin='normal'
                                label='出版社'
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                inputRef={pubDate}
                                margin='normal'
                                label='年份'
                                fullWidth
                                required
                                error={pubErr}
                                helperText={(pubErr) ? '不合法的输入' : ''}
                                onChange={() => { (pubDate.current.value.match(isN) || pubDate.current.value === '') ? setPubErr(false) : setPubErr(true) }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                inputRef={price}
                                margin='normal'
                                label='价格'
                                fullWidth
                                required
                                error={priceErr}
                                helperText={(priceErr) ? '不合法的输入' : ''}
                                onChange={() => { (price.current.value.match(isDouble2) || price.current.value === '') ? setPriceErr(false) : setPriceErr(true) }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                inputRef={total}
                                margin='normal'
                                label='总藏书量'
                                fullWidth
                                required
                                error={totalErr}
                                helperText={(totalErr) ? '不合法的输入' : ''}
                                onChange={() => { (total.current.value.match(isN) || total.current.value === '') ? setTotalErr(false) : setTotalErr(true) }}
                            />
                        </Grid>
                    </Grid>
                    <div className={classes.submit}>
                        <Button
                            type='submit'
                            variant='contained'
                            color='primary'
                            disabled={!singleSubmitStatus}
                        >
                            入库
                        </Button>
                    </div>
                </form>
                <Typography variant='h5' component='h2' className={classes.subtitle}>批量入库</Typography>
                <label>
                    <Typography>选择csv文件并上传</Typography>
                    <input
                        style={{ margin: 30 }}
                        type='file'
                        accept='.csv'
                        onChange={(e) => {
                            setFileData(e.target.files[0]);
                            (fileSubmitStatus === null) ? setFileSubmitStatus(false) : setFileSubmitStatus(true);
                        }}
                    />
                </label>
                <div className={classes.submit}>
                    <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                        disabled={!fileSubmitStatus}
                        onClick={handleFileSubmit}>
                        入库
                    </Button>
                </div>
            </Paper>
        </>
    )
}

export default ImportBook;