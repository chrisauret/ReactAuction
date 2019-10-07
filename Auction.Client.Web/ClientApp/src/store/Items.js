const requestItemsType = 'REQUEST_ITEMS';
const receiveItemsType = 'RECEIVE_ITEMS';
const requestItemTpe = 'REQUEST_ITEM';
const receiveItemType = 'RECEIVE_ITEM';
const updateItemType = 'UPDATE_ITEM';

const initialState = { items: [], userId: 9099, isLoading: false, bidAmount: 0.0 };

export const actionCreators = {
    requestItems: () => async (dispatch, getState) => {

        dispatch({ type: requestItemsType });

        const url = `api/Home/GetItems`;
        const response = await fetch(url);
        const items = await response.json();

        dispatch({ type: receiveItemsType, payload: items });
    },

    requestItem: (id) => async (dispatch, getState) => {
        dispatch({ type: requestItemTpe });

        const url = `api/Home/GetItem/${id}`;
        const response = await fetch(url);
        const item = await response.json();

        dispatch({ type: receiveItemType, payload: item });
    },

    placeBid: (item) => async (dispatch, getState) => {

        let state = getState();

        const baseURL = "api/home/placebid";

        const data = JSON.stringify({
            ...item,
            userId: state.items.userId
        });

        fetch(baseURL, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: data
        })
        .then(response => response.json())
        .then(item => {
            dispatch({ type: updateItemType, payload: item })
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

        return {
            ...state,
            items: action.payload,
            isLoading: false,
        };
    }

    if (action.type === updateItemType) {

        let items = [...state.items];
        let objIndex = items.findIndex((obj => obj.id === action.payload.id));
        items[objIndex] = action.payload;

        return {
            userId: state.userId,
            bidAmount: 0,
            items: items,
            isLoading: false
        };
    }

    return state;
}