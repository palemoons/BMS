import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { Paper } from '@material-ui/core';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
        minHeight: 200
    },
});

function BookList({ res }) {
    const classes = useStyles();
    const rowArr = ['书号', '类别', '书名', '出版社', '出版年份', '作者', '价格', '总藏书量', '库存'];
    return (
        <TableContainer component={Paper} style={{ minHeight: 150 }}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        {rowArr.map((value, i) => { return <TableCell align='center' key={i}>{value}</TableCell> })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {res.map((value, i) => (
                        <TableRow key={i}>
                            <TableCell>{value.book_id}</TableCell>
                            <TableCell>{value.category}</TableCell>
                            <TableCell>{value.book_title}</TableCell>
                            <TableCell>{value.press}</TableCell>
                            <TableCell>{value.pub_date}</TableCell>
                            <TableCell>{value.author}</TableCell>
                            <TableCell>{value.price}</TableCell>
                            <TableCell>{value.total}</TableCell>
                            <TableCell>{value.stock}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default BookList;