import React, { Component } from 'react';

import { connect } from 'react-redux';

import Load from '../../../components/Loading/loading';
import LoginComponent from '../../../components/Auth/Login/login';
import NotValid from '../../../components/Error/notValid/notValid';
import {
    redirectHandler, loadingHandler, submitLogin, submitError, errorHandler, cancelHandler
} from '../../../store/actions/login';

class Login extends Component {
    state = {
        password: '',
        fakePassword: '',
        disabled: true
    }

    componentDidMount() {
        this.props.onLoading();
        this.props.onRedirect();
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.loading !== this.props.loading) {
            return true;
        }
        const path = nextProps.redirectPath;
        if (nextProps.redirect) {
            this.props.history.push('/' + path);
        }
        if (nextState.password !== this.state.password) {
            return true;
        }
        if (nextProps.error !== this.props.error) {
            return true;
        }
        return false;
    }

    passwordChangeHandler = (e) => {
        const value = e.target.value.trim();
        let fake = '';

        for (let x = 0; x < value.length; x++) {
            fake += '*';
        }

        if (value.length >= 8 & this.state.disabled) {
            this.setState({
                disabled: false
            });
        }

        if (value.length < 8 & !this.state.disabled) {
            this.setState({
                disabled: true
            });
        }

        this.setState({
            password: value,
            fakePassword: fake
        });
    }

    submitClickHandler = () => {
        const email = this.props.email;
        const password = this.state.password;
        this.props.onSubmit(email, password);
    }

    cancelClickHandler = () => {
        this.props.onCancel();
    }

    errorClickHandler = () => {
        this.props.onError();
    }

    render() {

        const Loading = <Load />;

        const notValid = <NotValid children={this.props.errorMessage} onClick={this.errorClickHandler} />;

        const Page = <LoginComponent type={'password'} value={this.state.password}
            onChange={this.passwordChangeHandler.bind(this)} children={this.state.fakePassword}
            onClickSubmit={this.submitClickHandler} onClickCancel={this.cancelClickHandler}
            disabled={this.state.disabled}
        />;

        const Content = this.props.error ? notValid : this.props.loading ? Loading : Page;

        return Content;
    }
}

const mapStateToProps = state => {
    return {
        email: state.mac.email,
        loading: state.log.loading,
        error: state.log.error,
        errorMessage: state.log.errorMessage,
        redirect: state.log.redirect,
        redirectPath: state.log.redirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onRedirect: () => dispatch(redirectHandler()),
        onLoading: () => dispatch(loadingHandler()),
        onSubmit: (email, password) => dispatch(submitLogin(email, password)),
        onSubmitError: () => dispatch(submitError()),
        onError: () => dispatch(errorHandler()),
        onCancel: () => dispatch(cancelHandler())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);