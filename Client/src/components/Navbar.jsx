import React from 'react';
import styled from 'styled-components';
import { Link, Redirect, useHistory } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'


const LogOut = styled.p`
    cursor: pointer
`

const Navbar = props => {
    const history = useHistory()
    const dispatch = useDispatch()
    const auth = useSelector(state => state.isAuthenticated);
    const status = useSelector(state => state.user.role);

    const clickEvent = () => {
        localStorage.removeItem('token');
        history.push('/')
        dispatch({type: 'LOGOUT'});
    }

    return (
        <nav className="flex flex-row justify-around">
            <Link to="/">Home</Link>
            {status === 'hrd' ? <Link to="/postjob">Post Job</Link> : null}
            {auth ? <Link to="/jobs">List Job</Link> : null}
            {!auth ? <Link to="/register">Register</Link> : null}
            {!auth ? <Link to="/login">Login</Link> : <Link to="/profile">Profile</Link>}
            <Link to="/about">about</Link>
            {auth ? <LogOut onClick={clickEvent}>Logout</LogOut> : <Redirect to="/"/>}
        </nav>
    )
}

export default Navbar