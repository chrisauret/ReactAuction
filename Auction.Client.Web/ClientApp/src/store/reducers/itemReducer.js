import {
    requestItemsType,
    receiveItemsType,
    requestUpdateItemType,
    receiveUpdateItemType
} from '../actions/types'

const initialState = {
    items: [],
    isLoading: false
};

export const itemReducer = (state, action) => {
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
        }
    }

    if (action.type === requestUpdateItemType) {

        return {
            ...state,
            isLoading: true
        };
    }

    if (action.type === receiveUpdateItemType) {

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