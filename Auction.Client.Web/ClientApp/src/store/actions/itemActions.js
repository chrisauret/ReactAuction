import axios from 'axios';
import {
    requestItemsType,
    receiveItemsType,
    requestUpdateItemType,
    receiveUpdateItemType,
    requestItemTpe,
    receiveItemType
} from '../actions/types'

export const requestItems = () => async (dispatch, getState) => {

    dispatch({ type: requestItemsType });

    const url = `api/Home/GetItems`;

    axios.get(url).then(res => {
        console.log("requestItems ", res);
        dispatch({ type: receiveItemsType, payload: res.data })
    })
        .catch(error => {
            console.log("requestItems ", error);
        });
};

export const requestItem = (id) => async (dispatch, getState) => {
    dispatch({ type: requestItemTpe });

    const url = `api/Home/GetItem/${id}`;
    const response = await fetch(url);
    const item = await response.json();

    dispatch({ type: receiveItemType, payload: item });
};

export const placeBid = (item) => async (dispatch, getState) => {

    dispatch({ type: requestUpdateItemType });

    let state = getState();
    const url = "api/home/placebid";

    const data = JSON.stringify({
        ...item,
        userId: state.itemReducer.userId
    });

    const headers = { 'Content-Type': 'application/json' };

    axios.post(url, data, { headers: headers }).then(res => {
        console.log("placeBid :", res);
        dispatch({ type: receiveUpdateItemType, payload: res.data })
    }).catch(err => {
        console.log("Error in PlaceBid :", err);
    })
};