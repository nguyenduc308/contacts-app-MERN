import React, { useState, useContext, useEffect } from "react";
import { Form, Input, Button} from "antd";
import { UserFormStyled, UserFormWrapStyled } from './FormStyled'
import { Link } from 'react-router-dom'
import Alerts from '../alerts'
import { useHistory } from 'react-router-dom'
import AuthContext from '../../context/auth/authContext'
import AlertContext from '../../context/alert/alertContext'
const Register = () => {
    const history = useHistory()
    const alertContext = useContext(AlertContext)
    const authContext = useContext(AuthContext)
    const { setAlert } = alertContext;
    const { login, error, clearError, isAuthenticated } = authContext;
    const [user, setUser] = useState({
        email: '',
        password: '',
    })
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }
    useEffect(()=> {
        if(isAuthenticated) {
            history.push('/')
        }

        if(error) {
            setAlert(error, 'danger')
            clearError()
        }
        //eslint-disable-next-line
    },[error, isAuthenticated])
    const { email, password} = user;
    const onFinish = () => {
        login(user)
    };
    return (
        <UserFormStyled>
            <h2>LOGIN</h2>
            <Alerts />
            <UserFormWrapStyled>
                <Form
                    name="basic"
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Please input your email!"
                            }
                        ]}
                    >
                        <Input
                            name="email"
                            value={email}
                            onChange={handleChange}
                            placeholder="Your email"
                        />
                    </Form.Item>


                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your password!"
                            }
                        ]}
                    >
                        <Input.Password 
                            name="password"
                            value={password}
                            onChange={handleChange}
                            placeholder="Your password"
                        />
                    </Form.Item>
                    <Form.Item style={{textAlign: 'center'}}>
                        <Button type="primary" htmlType="submit">
                            Login
                        </Button>
                    </Form.Item>
                    <p>You dont have account ? <Link to="/register">Register</Link></p>
                </Form>
            </UserFormWrapStyled>
        </UserFormStyled>
    );
};

export default Register;
