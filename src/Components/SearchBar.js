import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { MenuItem, Paper, Grid, Select, InputLabel, Typography, TextField, Button } from '@material-ui/core';

import Config from '../config.json';
const useStyle = makeStyles((theme) => ({
    root: {
        margin: 'auto',
        padding: theme.spacing(2)
    },
    title: {
        textAlign: 'center'
    },
    subtitle: {
        paddingTop: theme.spacing(8),
    },
    form: {
        display: 'inline',
        margin: theme.spacing(1),
        textAlign: 'center',
        minWidth: 120,
        marginRight: theme.spacing(3),
    },
    submit: {
        display: 'flex',
        flexDirection: 'row-reverse',
        '& .MuiButton-contained': {
            marginTop: theme.spacing(2),
        }
    }
}))

function SearchBar({ setRes }) {
    const searchArr = ['类别', '书名', '出版社', '出版年份', '作者', '价格区间'];
    const classes = useStyle();
    const [type, setType] = useState('');
    const [query, setQuery] = useState('书名');
    const [searchStatus, setSearchStatus] = useState(false);
    const searchRef = useRef(''), minPriceRef = useRef(''), maxPriceRef = useRef('');

    const handleSearchCheck = () => {
        if (type === '价格区间') {
            if (minPriceRef.current.value === '' && maxPriceRef.current.value === '') setSearchStatus(false);
            else setSearchStatus(true);
        }
        else {
            if (searchRef.current.value === '') setSearchStatus(false);
            else setSearchStatus(true);
        }
    }
    const handleSearch = (event) => {
        event.preventDefault();
        let fetchBody = {};
        let field = '', queryField = '';
        switch (type) {
            case '类别': { field = 'category'; break; }
            case '书名': { field = 'book_title'; break; }
            case '出版社': { field = 'press'; break; }
            case '出版年份': { field = 'pub_date'; break; }
            case '作者': { field = 'author'; break; }
            case '价格区间': { field = 'price'; break; }
            default: { alert('出错啦！请联系管理员qwq'); break; }
        }
        switch (query) {
            case '类别': { queryField = 'category'; break; }
            case '书名': { queryField = 'book_title'; break; }
            case '出版社': { queryField = 'press'; break; }
            case '出版年份': { queryField = 'pub_date'; break; }
            case '作者': { queryField = 'author'; break; }
            case '价格区间': { queryField = 'price'; break; }
            default: { alert('出错啦！请联系管理员qwq'); break; }
        }
        if (type === '价格区间') {
            fetchBody = JSON.stringify({
                field: field,
                minPrice: minPriceRef.current.value,
                maxPrice: maxPriceRef.current.value,
                query: queryField
            })
        }
        else {
            fetchBody = JSON.stringify({
                field: field,
                condition: searchRef.current.value,
                query: queryField
            })
        }
        fetch(`${Config.url}/query`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: fetchBody
        })
            .then((res) => {
                res.json().then((data) => ({
                    data: data,
                    status: res.status
                }))
                    .then(res => { setRes(res.data) })
            })
    }
    return (
        <Paper className={classes.root}>
            <Typography variant='h4' component='h1' className={classes.title}>查询书籍</Typography>
            <Typography variant='h5' component='h2' className={classes.subtitle}>条件筛选</Typography>
            <form className={classes.form} onSubmit={handleSearch}>
                <Grid container spacing={4} style={{ marginTop: 25 }}>
                    <Grid item xs={6} sm={2}>
                        <InputLabel id='search'>筛选条件</InputLabel>
                        <Select
                            value={type}
                            fullWidth
                            variant='standard'
                            onChange={(e) => { setType(e.target.value) }}
                            labelId='search'>
                            {searchArr.map((value, i) => {
                                return <MenuItem key={i} value={value}>{value}</MenuItem>
                            })}
                        </Select>
                    </Grid>
                    <Grid item xs={6} sm={2}>
                        <InputLabel id='query'>排序方式(可选)</InputLabel>
                        <Select labelId='query' fullWidth defaultValue='书名' onChange={(e) => { setQuery(e.target.value) }}>
                            {searchArr.map((value, i) => {
                                return <MenuItem key={i} value={value}>{value}</MenuItem>
                            })}
                        </Select>
                    </Grid>
                    {
                        (type === '价格区间') ?
                            <>
                                <Grid item xs={6} sm={2}>
                                    <TextField
                                        inputRef={minPriceRef}
                                        label='最低价格'
                                        margin='normal'
                                        variant='filled'
                                        fullWidth
                                        onChange={handleSearchCheck}
                                    />
                                </Grid>
                                <Grid item xs={6} sm={2}>
                                    <TextField
                                        inputRef={maxPriceRef}
                                        label='最高价格'
                                        margin='normal'
                                        variant='filled'
                                        fullWidth
                                        onChange={handleSearchCheck}
                                    />
                                </Grid>
                            </>
                            :
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    inputRef={searchRef}
                                    onChange={handleSearchCheck}
                                    label='条件'
                                    fullWidth
                                    variant='filled'
                                    margin='normal'
                                    required
                                />
                            </Grid>
                    }
                </Grid>
                <div className={classes.submit}>
                    <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                        disabled={!searchStatus}
                    >
                        查询
                    </Button>
                </div>
            </form>
        </Paper >
    )
}

export default SearchBar;