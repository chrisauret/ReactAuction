import setAuthorisationToken from '../../utils/setAuthorisationToken';
import { push } from 'connected-react-router';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import {
    REQUEST_SIGN_IN_USER,
    RECEIVE_SIGN_IN_USER,
    REQUEST_SIGN_UP_USER,
    RECEIVE_SIGN_UP_USER,
    SET_USER_SIGNED_IN
} from '../actions/types'

export const requestSignUp = (user) => async (dispatch, getState) => {

    dispatch({ type: REQUEST_SIGN_UP_USER });

    const url = `api/Users/signup`;

    const data = JSON.stringify({
        ...user
    });

    const headers = { 'Content-Type': 'application/json' };

    axios.post(url, data, { headers: headers }).then(res => {
        const user = res.data;

        dispatch({ type: RECEIVE_SIGN_UP_USER, payload: user });
        dispatch({ type: SET_USER_SIGNED_IN, payload: jwt.decode(user.token) });
    });
};

export const requestSignIn = (user) => async (dispatch, getState) => {

    dispatch({ type: REQUEST_SIGN_IN_USER });

    const url = `api/Users/Authenticate`;

    const data = JSON.stringify({
        ...user
    });

    const headers = { 'Content-Type': 'application/json' };

    axios.post(url, data, { headers: headers })
        .then(res => {
            const user = res.data;

            dispatch({ type: RECEIVE_SIGN_IN_USER, payload: user });
            dispatch({ type: SET_USER_SIGNED_IN, payload: jwt.decode(user.token) });

            localStorage.setItem('jwtToken', user.token);
            setAuthorisationToken(user.token);

            dispatch(push('/'));
        });
};