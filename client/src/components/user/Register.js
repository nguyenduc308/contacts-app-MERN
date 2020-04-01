import React, { useState, useContext, useEffect } from "react";
import { Form, Input, Button} from "antd";
import { UserFormStyled, UserFormWrapStyled } from './FormStyled'
import { Link } from 'react-router-dom'
import AuthContext from "../../context/auth/authContext";
import Alerts from '../alerts'
import AlertContext from '../../context/alert/alertContext'
import { useHistory } from 'react-router-dom'
const Register = (props) => {
    const authContext = useContext(AuthContext);
    const alertContext = useContext(AlertContext);
    const { setAlert } = alertContext;
    const history = useHistory()
    const { register, error, clearError, isAuthenticated } = authContext;
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const { name, email, password, confirmPassword } = user;
    const onFinish = () => {
        register({
            name,
            email,
            password,
            confirmPassword
        })
    };
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
    return (
        <UserFormStyled>
            <h2>REGISTER</h2>
            <Alerts />
            <UserFormWrapStyled>
                <Form
                    name="basic"
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: "Please input your name!"
                            }
                        ]}
                    >
                        <Input 
                            name="name"
                            value={name}
                            onChange={handleChange}
                            placeholder="Your name"
                        />
                    </Form.Item>
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
                    <Form.Item
                        name="confirmPassword"
                        rules={[
                            {
                                required: true,
                                message: "Please input your password!"
                            }
                        ]}
                    >
                        <Input.Password
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm password"
                        />
                    </Form.Item>
                    <Form.Item style={{textAlign: 'center'}}>
                        <Button type="primary" htmlType="submit">
                            Register
                        </Button>
                        <p>Have account? <Link to="/login">Login</Link></p>
                    </Form.Item>
                </Form>
            </UserFormWrapStyled>
        </UserFormStyled>
    );
};

export default Register;
