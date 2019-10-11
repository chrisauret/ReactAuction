import React from 'react';
import { Route } from 'react-router';
import Home from './components/Home';
import Grid from '@material-ui/core/Grid';

export default () => (
        <Route exact path='/' component={Home} />
);