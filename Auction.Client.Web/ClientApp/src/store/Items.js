const requestItemsType = 'REQUEST_ITEMS';
const receiveItemsType = 'RECEIVE_ITEMS';
const requestItemTpe = 'REQUEST_ITEM';
const receiveItemType = 'RECEIVE_ITEM';
const updateItemType = 'UPDATE_ITEM';

const initialState = { items: [], item: {}, currId: 0, userId:9099, isLoading: false, bid:"" };

let allitems = [];

export const actionCreators = {
    requestItems: () => async (dispatch, getState) => {

        dispatch({ type: requestItemsType });

        const url = `api/Home/GetItems`;
        const response = await fetch(url);
        const allitems = await response.json();

        dispatch({ type: receiveItemsType, allitems });
    },

    requestItem: (id) => async (dispatch, getState) => {
        dispatch({ type: requestItemTpe });

        const url = `api/Home/GetItem/${id}`;
        const response = await fetch(url);
        const item = await response.json();

        dispatch({ type: receiveItemType, item });
    },

    placeBid: (item) => async (dispatch, getState) => {

        console.log("wow");
        console.log("item", item);

        const baseURL = "api/home/placebid";

        const data = JSON.stringify({
            itemId: 123, userId: 876, amount: 170.0
        });

        console.log("Posting: ", data);

        fetch(baseURL, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: data
        })
        .then((data) => {
            console.log("Place bid Response: ", data);
            dispatch({ type: updateItemType, item: data });
        });
    },
}

export const reducer = (state, action) => {
    state = state || initialState;

    if (action.type === requestItemsType) {

        return {
            ...state,
            isLoading: true
        };
    }

    if (action.type === receiveItemsType) {

        allitems = action.allitems;

        console.log("allitems",allitems);

        return {
            ...state,
            items: allitems,
            isLoading: false
        };
    }

    if (action.type === updateItemType) {
        return {
            ...state,
            isLoading: false
        };
    }

    return state;
}