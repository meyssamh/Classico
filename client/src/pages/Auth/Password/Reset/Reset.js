import React, { Component } from 'react';

import { connect } from 'react-redux';

import Load from '../../../../components/Loading/loading';
import ResetComponent from '../../../../components/Auth/Password/Reset/reset';
import NotValid from '../../../../components/Error/notValid/notValid';
import {
    redirectHandler, loadingHandler, submitReset, submitError, errorHandler, cancelHandler
} from '../../../../store/actions/reset';

class Reset extends Component {
    state = {
        password: '',
        fakePassword: '',
        confirmPassword: '',
        fakeConfirmPassword: '',
        passwordToken: this.props.match.params,
        disabled: true
    }

    componentDidMount() {
        this.props.onRedirect();
        this.props.onLoading();
    }

    componentDidUpdate() {
        if (this.state.password.length >= 8 &
            this.state.confirmPassword.length >= 8 &
            this.state.disabled) {
            this.setState({
                disabled: false
            });
        }

        if ((this.state.password.length < 8 |
            this.state.confirmPassword.length < 8) &
            !this.state.disabled) {
            this.setState({
                disabled: true
            });
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        const path = nextProps.redirectPath;
        if (nextProps.redirect) {
            this.props.history.push('/' + path);
        }
        if (nextProps.loading !== this.props.loading) {
            return true;
        }
        if (this.state.password.length >= 8 &
            this.state.confirmPassword.length >= 8 &
            this.state.disabled) {
            return true;
        } else if ((this.state.password.length < 8 |
            this.state.confirmPassword.length < 8) &
            !this.state.disabled) {
            return true;
        } else if (nextState.password !== this.state.password ||
            nextState.confirmPassword !== this.state.confirmPassword) {
            return true;
        } else if (nextProps.error !== this.props.error) {
            return true;
        }
        return false;
    }

    inputChangeHandler = (e) => {
        const value = e.target.value.trim();
        const name = e.target.name;

        let firstLetter = name[0].toUpperCase();
        let otherLetters = name.slice(1);
        let fakeName = 'fake' + firstLetter + otherLetters;
        let fake = '';

        for (let x = 0; x < value.length; x++) {
            fake += '*';
        }

        this.setState({
            [name]: value,
            [fakeName]: fake
        });
    }

    submitClickHandler = () => {
        const password = this.state.password;
        const confirmPassword = this.state.confirmPassword;
        const passwordToken = this.state.passwordToken;

        if (password !== confirmPassword) {
            this.props.onSubmitError();
        } else {
            this.props.onSubmit(password, confirmPassword, passwordToken);
        }
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

        const Page = <ResetComponent type={'password'} nameFirstInput={'password'}
            valueFirstInput={this.state.password} onChange={this.inputChangeHandler.bind(this)}
            firstChildren={this.state.fakePassword} nameSecondInput={'confirmPassword'}
            valueSecondInput={this.state.confirmPassword} secondChildren={this.state.fakeConfirmPassword}
            onClickSubmit={this.submitClickHandler} onClickCancel={this.cancelClickHandler}
            disabled={this.state.disabled}
        />;

        const Content = this.props.error ? notValid : this.props.loading ? Loading : Page;

        return Content;
    }
}

const mapStateToProps = state => {
    return {
        email: state.fog.email,
        loading: state.res.loading,
        error: state.res.error,
        errorMessage: state.res.errorMessage,
        redirect: state.res.redirect,
        redirectPath: state.res.redirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onRedirect: () => dispatch(redirectHandler()),
        onLoading: () => dispatch(loadingHandler()),
        onSubmit: (password, confirmPassword, passwordToken) =>
            dispatch(submitReset(password, confirmPassword, passwordToken)),
        onSubmitError: () => dispatch(submitError()),
        onError: () => dispatch(errorHandler()),
        onCancel: () => dispatch(cancelHandler())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Reset);