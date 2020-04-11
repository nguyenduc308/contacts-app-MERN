import React, { useReducer } from 'react';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import callApi from '../../utils/callApi' 
import {
    GET_CONTACTS,
    CLEAR_CONTACTS,
    ADD_CONTACT,
    CONTACT_ERR,
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
        loading: true,
        error: null
    };
    const [state, dispatch] = useReducer(contactReducer, initState);
    //Get Contact
    const getContacts = async () => {
        try {
            const res = await callApi().get('/contacts')
            dispatch({
                type: GET_CONTACTS,
                payload: res.data.data
            })
        } catch (error) {
            dispatch({
                type: CONTACT_ERR,
                payload: error.response.data.error
            })
        }
    }
    //Add contact
    const addContact = async (token,contact) => {
        try {
            const res = await callApi(token).post('/contacts', contact)
            dispatch({
                type: ADD_CONTACT,
                payload: res.data.data
            })
        } catch (error) {
            dispatch({
                type: CONTACT_ERR,
                payload: error.response.data.error
            })
        }
    }
    //Delete contact
    const deleteContact = async (token,id) => {
        try {
            await callApi(token).delete(`/contacts/${id}`)
            console.log("done")
            dispatch({
                type: DELETE_CONTACT,
                payload: id
            })
        } catch (error) {
            dispatch({
                type: CONTACT_ERR,
                payload: error.response.data.error
            })
        }
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
    const updateContact = async (token,contact) => {
        try {
            const res = await callApi(token).patch(`/contacts/${contact._id}`, contact)
            console.log(res)
            dispatch({
                type: UPDATE_CONTACT,
                payload: res.data.data
            })
        } catch (error) {
            dispatch({
                type: CONTACT_ERR,
                payload: error.response.data.error
            })
        }
    }
    //Filter contacts
    const filterContacts = text => {
        dispatch({
            type: FILTER_CONTACT,
            payload: text
        })
    }
    //Clear filter
    const clearFilter = () => {
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
