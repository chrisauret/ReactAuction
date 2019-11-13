import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk';
import setAuthorisationToken from '../utils/setAuthorisationToken';
import { item } from '../store/reducers/itemReducer';
import { user } from "../store/reducers/userReducer";
import { session } from "../store/reducers/sessionReducer";

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

// Persist the Redux state to localStorage
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
    if (isDevelopment && typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__) {
        enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__());
    }

    setAuthorisationToken(localStorage.jwtToken);

    const rootReducer = (history) => combineReducers({
        router: connectRouter(history),
        session,
        item,
        user
    });

    return createStore(
        rootReducer(history),
        initialState,
        compose(applyMiddleware(...middleware), ...enhancers)
    );
}