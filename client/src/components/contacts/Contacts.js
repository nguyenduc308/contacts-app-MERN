import React, { useContext, useEffect } from 'react'
import ContactContext from '../../context/contact/contactContext'
import { Row, Col } from 'antd'
import ContactItem from './ContactItem'
import ContactForm from './ContactForm'
import {ContactsStyle } from './contactStyled'
const Contacts = () => {
    const contactContext = useContext(ContactContext);
    
    const { contacts, filtered, getContacts } = contactContext ;
    useEffect(()=> {
        getContacts();
        //eslint-disable-next-line
    },[])
    if(contacts.length === 0) {
        return <h3>Plese add new contact</h3>
    }
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
