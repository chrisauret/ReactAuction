import {
    REQUEST_ITEMS,
    RECEIVE_ITEMS,
    REQUEST_UPDATE_ITEM,
    RECEIVE_UPDATE_ITEM
} from '../actions/types'

const initialState = {
    items: [],
    isLoading: false
};

export const itemReducer = (state, action) => {
    state = state || initialState;

    if (action.type === REQUEST_ITEMS) {

        return {
            ...state,
            isLoading: true
        };
    }

    if (action.type === RECEIVE_ITEMS) {

        return {
            ...state,
            items: action.payload,
            isLoading: false,
        }
    }

    if (action.type === REQUEST_UPDATE_ITEM) {

        return {
            ...state,
            isLoading: true
        };
    }

    if (action.type === RECEIVE_UPDATE_ITEM) {

        let items = [...state.items];
        let objIndex = items.findIndex((obj => obj.id === action.payload.id));
        items[objIndex] = action.payload;

        return {
            ...state,
            items,
            isLoading: false
        }
    }

    return state;
}