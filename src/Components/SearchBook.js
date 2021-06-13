import React, { useState } from 'react';
import SearchBar from './SearchBar';
import BookList from './BookList';

function SearchBook() {
    const [res, setRes] = useState([]);
    return (
        <>
            <SearchBar setRes={setRes} />
            <BookList res={res} />
        </>
    )
}

export default SearchBook;