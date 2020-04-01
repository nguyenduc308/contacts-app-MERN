import React, { useEffect, useContext } from 'react'
import Contact from '../contacts/Contacts'
import AuthContext from '../../context/auth/authContext'
const Home = () => {
    const authContext = useContext(AuthContext);
    useEffect(()=> {
        authContext.loadUser()
        //eslint-disable-next-line
    },[])
    return (
        <div>
            <Contact />
        </div>
    )
}

export default Home
