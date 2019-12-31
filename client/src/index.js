import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import thunk from 'redux-thunk';

import MyAccountReducer from './store/reducers/myAccountReducer';
import SignupReducer from './store/reducers/signupReducer';
import LoginReducer from './store/reducers/loginReducer';
import ForgotReducer from './store/reducers/forgotReducer';
import ResetReducer from './store/reducers/resetReducer';
import LibraryReducer from './store/reducers/libraryReducer';
import ProfileReducer from './store/reducers/profileReducer';
import './index.scss';
import App from './pages/App';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    mac: MyAccountReducer,
    sup: SignupReducer,
    log: LoginReducer,
    res: ResetReducer,
    fog: ForgotReducer,
    lib: LibraryReducer,
    pro: ProfileReducer
});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const app = (
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();