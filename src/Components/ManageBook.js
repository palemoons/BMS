import React, { useState } from 'react';
import SearchCard from './SearchCard';
import BookList from './BookList';
import BorrowBar from './BorrowBar';

function ManageBook() {
    const [res, setRes] = useState([]);
    const [idCheck, setIdCheck] = useState(false);
    const [id, setId] = useState('');

    return (
        <>
            {
                (!idCheck) ?
                    <SearchCard
                        setRes={setRes}
                        setIdCheck={setIdCheck}
                        setId={setId} />
                    :
                    <>
                        <BorrowBar id={id} res={res} setRes={setRes} />
                        <BookList res={res} />
                    </>
            }
        </>
    )
}

export default ManageBook;