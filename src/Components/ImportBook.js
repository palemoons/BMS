import React, { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Button, Grid, Paper, TextField } from '@material-ui/core';

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
    const bookId = useRef(''), category = useRef(''), bookTitle = useRef(''), press = useRef(''), pubDate = useRef(''), author = useRef(''), price = useRef(''), total = useRef(''), stock = useRef('');
    const [pubErr, setPubErr] = useState(false);
    const [priceErr, setPriceErr] = useState(false);
    const [totalErr, setTotalErr] = useState(false);
    const [stockErr, setStockErr] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(false);

    const handleSingleSubmit = (event) => {
        event.preventDefault();
        fetch(`${Config.url}/book/single-import`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                "book_id": bookId.current.value,
                'category': category.current.value,
                'book_title': bookTitle.current.value,
                'press': press.current.value,
                'pub_date': pubDate.current.value,
                'author': author.current.value,
                'price': price.current.value,
                'total': total.current.value,
                'stock': stock.current.value
            })
        })
            .then(res => {
                // TODO
            })
    }
    const singleSubmitCheck = () => {
        (pubErr || priceErr || totalErr || stockErr || bookId.current.value === '' || category.current.value === '' || bookTitle.current.value === '' || author.current.value === '' || press.current.value === '' || pubDate.current.value === '' || price.current.value === '' || total.current.value === '' || stock.current.value === '')
            ?
            setSubmitStatus(false)
            :
            setSubmitStatus(true)
    }
    return (
        <>
            <Paper className={classes.root}>
                <Typography variant='h4' component='h1' className={classes.title}>导入书籍</Typography>
                <Typography variant='h5' component='h2' className={classes.subtitle}>单本入库</Typography>
                <form noValidate onSubmit={handleSingleSubmit} onChange={singleSubmitCheck}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                inputRef={bookId}
                                margin='normal'
                                label='书号'
                                fullWidth
                                required
                                autoFocus={true}
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
                                inputRef={bookTitle}
                                margin='normal'
                                label='书名'
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
                        <Grid item xs={12} sm={6}>
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
                        <Grid item xs={12} sm={6}>
                            <TextField
                                inputRef={stock}
                                margin='normal'
                                label='库存'
                                fullWidth
                                required
                                error={stockErr}
                                helperText={(stockErr) ? '不合法的输入' : ''}
                                onChange={() => { (stock.current.value.match(isN) || stock.current.value === '') ? setStockErr(false) : setStockErr(true) }}
                            />
                        </Grid>
                    </Grid>
                    <div className={classes.submit}>
                        <Button
                            type='submit'
                            variant='contained'
                            color='primary'
                            disabled={!submitStatus}
                        >
                            入库
                    </Button>
                    </div>
                </form>
                <Typography variant='h5' component='h2' className={classes.subtitle}>批量入库</Typography>
            </Paper>
        </>
    )
}

export default ImportBook;