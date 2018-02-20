import React from 'react';
import '../App.css';
import { Router, Route, hashHistory } from 'react-router';
import Albums from './Albums.jsx';
import Home from './Home.jsx';
import PropTypes from 'prop-types';

class App extends React.Component {
    render() {
        return (
            <Router history={hashHistory}>
                <Route exact path='/' component={Home} />
                <Route path='/access_token=:accessToken&token_type=:tokenType&expires_in=:expiresIn' component={Albums} />
            </Router>
        );
    }
}

export default App;