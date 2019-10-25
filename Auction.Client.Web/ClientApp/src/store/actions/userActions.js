import {
    requestSignInUser,
    receiveSignInUser,
    requestSignUpUser,
    receiveSignUpUser,
    setUserSignedIn
} from '../actions/types'

export const requestSignUp = (user) => async (dispatch, getState) => {

    dispatch({ type: requestSignUpUser });

    const url = `api/Users/signup`;

    const data = JSON.stringify({
        ...user
    });

    fetch(url, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: data
    })
        .then(response => response.json())
        .then(user => {
            console.log("We have a user! :)", user);
            dispatch({ type: receiveSignUpUser, payload: user });
            dispatch({ type: setUserSignedIn, payload: user})
        });
};

export const requestSignIn = () => async (dispatch, getState) => {

    dispatch({ type: requestSignInUser });

    const url = `api/Users/Authenticate`;
    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log("type: ", requestSignUpUser);
            dispatch({ type: receiveSignInUser, payload: data });
        });
};