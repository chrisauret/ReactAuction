import React from 'react';
import { Route } from 'react-router';
import { MuiThemeProvider } from '@material-ui/core/styles';
import Home from './components/Home';
import theme from './components/AuctionTheme';

export default () => (
    <MuiThemeProvider theme={theme}>
        <Route exact path='/' component={Home} />
    </MuiThemeProvider>
);