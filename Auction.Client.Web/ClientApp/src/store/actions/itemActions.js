import axios from 'axios';
import {
    REQUEST_ITEMS,
    RECEIVE_ITEMS,
    REQUEST_UPDATE_ITEM,
    RECEIVE_UPDATE_ITEM,
    REQUEST_ITEM,
    RECEIVE_ITEM
} from '../actions/types'

export const requestItems = () => async (dispatch, getState) => {

    dispatch({ type: REQUEST_ITEMS });

    const url = `api/Home/GetItems`;

    axios.get(url).then(res => {
        dispatch({ type: RECEIVE_ITEMS, payload: res.data })
    })
        .catch(error => {
            console.log("Error :(  itemActions.requestItems() ", error);
        });
};

export const requestItem = (id) => async (dispatch, getState) => {
    dispatch({ type: REQUEST_ITEM });

    const url = `api/Home/GetItem/${id}`;
    const response = await fetch(url);
    const item = await response.json();

    dispatch({ type: RECEIVE_ITEM, payload: item });
};

export const placeBid = (item) => async (dispatch, getState) => {

    dispatch({ type: REQUEST_UPDATE_ITEM });

    let state = getState();
    const url = "api/home/placebid";
    const data = JSON.stringify({
        ...item,
        userId: state.session.user.id
    });
    const headers = { 'Content-Type': 'application/json' };

    axios.post(url, data, { headers: headers }).then(res => {

        dispatch({ type: RECEIVE_UPDATE_ITEM, payload: res.data })

    }).catch(error => {
        console.log("Error :( itemActions.placeBid :", error);
    })
};