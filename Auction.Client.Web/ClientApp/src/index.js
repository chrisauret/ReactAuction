import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import configureStore, { saveState, loadState } from './store/configureStore';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import CssBaseline from '@material-ui/core/CssBaseline';

// Create browser history to use in the Redux store
const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const history = createBrowserHistory({ basename: baseUrl });

// Get the application-wide store instance, prepopulating with state from the server where available.
const initialState = loadState();
const store = configureStore(history, initialState);

// When the state is mutated by any event save it to localStorage
store.subscribe(() => {
    saveState({
        session: store.getState().session
    });
})

const rootElement = document.getElementById('root');

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Fragment>
                <CssBaseline />
                <App />
            </Fragment>
        </ConnectedRouter>
    </Provider>, rootElement);

registerServiceWorker();