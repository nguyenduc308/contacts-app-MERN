import React, { useState, useContext } from "react";
import { Skeleton, Card } from 'antd';
import { EditOutlined, DeleteFilled, PhoneFilled, InboxOutlined } from '@ant-design/icons';
import { CardStyled } from "./contactStyled";
import ContactContext from "../../context/contact/contactContext"
const { Meta } = Card;

const ContactItem = ({ contact }) => {
    const { _id, name, email, phone } = contact;
    const [loading] = useState(false);
    const contactContext = useContext(ContactContext);
    const { deleteContact, setCurrent, clearCurrent, clearFilter } = contactContext
    const onDelete = () => {
        deleteContact(_id);
        clearCurrent()
        clearFilter()
    }
    const onUpdate = () => {
        setCurrent(contact)
        clearFilter()
    }
    return (
        <CardStyled>
                <Card
                style={{ width: 300}}
                actions={[
                    <DeleteFilled 
                    key="delete" 
                    onClick={onDelete}/>,
                    <EditOutlined 
                    key="edit"  
                    onClick={onUpdate}/>,
                ]}
                >
                <Skeleton loading={loading} avatar active>
                    <Meta
                        // avatar={
                        //     <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                        // }
                        title={name}
                        style={{marginBottom: '10px'}}
                    />
                    <div>
                        <p><InboxOutlined /> Email:  {email}</p>
                        <p><PhoneFilled /> Phone:  {phone}</p>
                    </div>
                </Skeleton>
            </Card>
        </CardStyled>
    );
};

export default ContactItem;
