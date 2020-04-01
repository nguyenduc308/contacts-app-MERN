import React, { useReducer } from 'react';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import callApi from '../../utils/callApi' 
import {
    GET_CONTACTS,
    CLEAR_CONTACTS,
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACT,
    CLEAR_FILTER
} from '../types'

const ContactState = props => {
    const initState = {
        contacts:  [
        ],
        current: null,
        filtered: null,
        loading: true
    };
    const [state, dispatch] = useReducer(contactReducer, initState);
    //Get Contact
    const getContacts = async () => {
        try {
            const res = await callApi().get('/contacts')
            console.log(res);
            dispatch({
                type: GET_CONTACTS,
                payload: res.data.data
            })
        } catch (error) {
            dispatch({
                type: "",
                payload: error.response.data.error
            })
        }
    }
    //Add contact
    const addContact = contact => {
        contact._id = Math.random();
        dispatch({
            type: ADD_CONTACT,
            payload: contact
        })
    }
    //Delete contact
    const deleteContact = id => {
        dispatch({
            type: DELETE_CONTACT,
            payload: id
        })
    }
    //Set current contact
    const setCurrent = contact => {
        dispatch({
            type: SET_CURRENT,
            payload: contact
        })
    }
    //Clear current contact
    const clearCurrent = contact => {
        dispatch({
            type: CLEAR_CURRENT
        })
    }
    //Update contact
    const updateContact = contact => {
        dispatch({
            type: UPDATE_CONTACT,
            payload: contact
        })
    }
    //Filter contacts
    const filterContacts = text => {
        dispatch({
            type: FILTER_CONTACT,
            payload: text
        })
    }
    //Clear filter
    const clearFilter = contact => {
        dispatch({
            type: CLEAR_FILTER
        })
    }

    return (
        <ContactContext.Provider
            value={{
                contacts: state.contacts,
                current: state.current,
                filtered: state.filtered,
                addContact,
                deleteContact,
                setCurrent,
                clearCurrent,
                updateContact, 
                filterContacts,
                clearFilter,
                getContacts
            }}
        >
            {props.children}
        </ContactContext.Provider>
    )
}

export default ContactState;
