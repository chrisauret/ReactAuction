import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import setAuthorisationToken from '../utils/setAuthorisationToken';
import thunk from 'redux-thunk';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { itemReducer } from '../store/reducers/itemReducer';
import { userReducer } from "../store/reducers/userReducer";
import { sessionReducer as session } from "../store/reducers/sessionReducer";

// Restore the Redux state from localStorage
export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
}

// Save the Redux state to localStorage
export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch (err) {
        console.log("ERROR saving state", err);
    }
}

export default function configureStore(history, initialState) {

    const middleware = [
        thunk,
        routerMiddleware(history)
    ];

    // In development, use the browser's Redux dev tools extension if installed
    const enhancers = [];
    const isDevelopment = process.env.NODE_ENV === 'development';
    if (isDevelopment && typeof window !== 'undefined' && window.devToolsExtension) {
        enhancers.push(window.devToolsExtension());
    }

    setAuthorisationToken(localStorage.jwtToken);

    const rootReducer = combineReducers({
        session,
        itemReducer,
        userReducer,
        routerReducer
    });

    return createStore(
        rootReducer,
        initialState,
        compose(applyMiddleware(...middleware), ...enhancers)
    );
}