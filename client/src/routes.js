import React from 'react';
import About from './components/pages/About'
import Home from './components/pages/Home'
import NotFound from './components/pages/NotFound'
import Register from './components/user/Register';
import Login from './components/user/Login';
export const routes = [
    {
        path: '/',
        private: true,
        exact: true,
        main: () => <Home />
    },
    {
        path: '/about',
        private: false,
        exact: false,
        main: () => <About />
    },
    {
        path: '/register',
        private: false,
        exact: false,
        main: () => <Register />
    },
    {
        path: '/login',
        private: false,
        exact: false,
        main: () => <Login />
    },
    {
        exact: false,
        private: false,
        main: () => <NotFound />
    },
]