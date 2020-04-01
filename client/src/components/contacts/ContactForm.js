import React, { useState, useContext, useEffect } from "react";
import { Form, Input, Button } from "antd";
import { FormStyled } from "./contactStyled";
import ContactContext from '../../context/contact/contactContext'

const ContactForm = () => {
    const contactContext = useContext(ContactContext)
    const {addContact, current, clearCurrent, updateContact } = contactContext;
    const [contact, setContact] = useState({
        name: "",
        email: "",
        phone: "",
        facebook: ""
    });
    useEffect(()=> {
        if(current !== null) {
            setContact(current)
        } else {
            setContact({
                name: "",
                email: "",
                phone: "",
                facebook: ""
            })
        }
    }, [contactContext,current])
    const { name, phone, email, facebook } = contact;
    const onChange = e => setContact({
        ...contact,
        [e.target.name]: e.target.value
    });
    const handleSubmit = (e) => {
        if(current === null) {
            addContact(contact);
        } else {
            updateContact(contact)
        }
        setContact({
            name: "",
            email: "",
            phone: "",
            facebook: ""
        })
    }
    const onClear = () => {
        clearCurrent();
    }
    return (
        <FormStyled>
            <h2>{current? "Edit Contact From" : "Add Contact Form"}</h2>
            <Form
                onFinish={handleSubmit}
                layout="horizontal"
            >
                <Form.Item>
                    <Input
                        name="name"
                        value={name}
                        onChange={onChange}
                        placeholder="DucLux"
                    />
                </Form.Item>
                <Form.Item >
                    <Input
                        name="email"
                        value={email}
                        onChange={onChange}
                        placeholder="duc@gmail.com"
                    />
                </Form.Item>
                <Form.Item>
                    <Input
                        name="phone"
                        value={phone}
                        onChange={onChange}
                        placeholder="0979671232"
                    />
                </Form.Item>
                <Form.Item>
                    <Input
                        name="facebook"
                        value={facebook}
                        onChange={onChange}
                        placeholder="nguyenduc308"
                    />
                </Form.Item>
                <Form.Item>
                    <Button 
                    htmlType="submit"
                    type="primary"
                    >
                        {current ? "Update Contact" : "Add Contact"}
                    </Button>
                    {current && <Button 
                    style={{float: "right"}}
                    onClick={onClear}
                    >Clear</Button>}
                </Form.Item>
            </Form>
        </FormStyled>
    );
};

export default ContactForm;
