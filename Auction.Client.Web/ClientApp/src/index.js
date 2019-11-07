import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
//import { ConnectedRouter } from 'react-router-redux';
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history';
import configureStore, { saveState, loadState } from './store/configureStore';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import CssBaseline from '@material-ui/core/CssBaseline';

// Create browser history to use in the Redux store
const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const history = createBrowserHistory({ basename: baseUrl });

// Get the application-wide store instance, prepopulating with state from the server where available.
//debugger;
const initialState = loadState();

//console.log("window.initialReduxState", window.initialReduxState)

const store = configureStore(history, initialState);

store.subscribe(() => {

    //console.log("State when saving to localstorage:", store.getState());
    saveState({
        sessionReducer: store.getState().sessionReducer
    });
})

const rootElement = document.getElementById('root');

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Fragment>
                <CssBaseline />
                <App />
            </Fragment>
        </Router>
    </Provider>,
    rootElement);

registerServiceWorker();
