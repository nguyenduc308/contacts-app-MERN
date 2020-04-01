import React, { useContext, useRef, useEffect } from 'react'
import { SearchStyled } from './headerStyled';
import ContactContext from '../../../context/contact/contactContext'
const Search = () => {
    const contactContext = useContext(ContactContext);
    const { filterContacts, clearFilter, filtered } = contactContext
    const text = useRef('')
    useEffect(()=> {
        if(filtered === null) {
            text.current.value = ''
        }
    }, [filtered])
    const handleChange = e => {
        if(text.current.value !== '') {
            filterContacts(e.target.value)
            console.log(text);
        } else {
            clearFilter()
        }
    }
    return (
        <SearchStyled>
            <input
            placeholder="Search contacts..."
            ref = {text}
            onChange = {handleChange}
            />
        </SearchStyled>
    )
}

export default Search
