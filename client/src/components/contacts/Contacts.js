import React, { useContext, useEffect } from 'react'
import ContactContext from '../../context/contact/contactContext'
import { Row, Col } from 'antd'
import ContactItem from './ContactItem'
import ContactForm from './ContactForm'
import {ContactsStyle } from './contactStyled'
import AuthContext from '../../context/auth/authContext'

const Contacts = () => {
    const contactContext = useContext(ContactContext);
    const authContext = useContext(AuthContext);

    const { contacts, filtered, getContacts } = contactContext ;
    const {token} = authContext;
    useEffect(()=> {
        getContacts(token);
        //eslint-disable-next-line
    },[])
    return (
        <>
        <Row>
            <Col span={8}>
                <ContactForm />
            </Col>
            <Col span={16}>
                <ContactsStyle>
                    {
                        filtered !== null ? filtered && filtered.map(contact => {
                            return <ContactItem key={contact._id} contact={contact} />
                        }) : contacts && contacts.map(contact => {
                            return <ContactItem key={contact._id} contact={contact} />
                        })
                    }
                </ContactsStyle>
            </Col>
        </Row>
        </>
    )
}

export default Contacts
