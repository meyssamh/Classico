import React, { Component } from 'react';

import { connect } from 'react-redux';

import Load from '../../../../components/Loading/loading';
import Redir from '../../../../components/Auth/Redirect/redirect';
import FinderComponent from '../../../../components/Auth/Password/Finder/finder';
import NotValid from '../../../../components/Error/notValid/notValid';
import {
    redirectHandler, redirectInfo, loadingHandler, submitForgot, submitError, errorHandler
    , cancelHandler
} from '../../../../store/actions/forgot';

class UserFinder extends Component {
    state = {
        email: '',
        disabled: true
    }

    componentDidMount() {
        this.props.onRedirect();
        this.props.onLoading();
    }

    shouldComponentUpdate(nextProps, nextState) {
        const path = nextProps.redirectPath;
        if (nextProps.redirect) {
            this.props.history.push('/' + path);
        }
        if (nextProps.loading !== this.props.loading) {
            return true;
        }
        if (nextProps.submit !== this.props.submit) {
            return true;
        }
        if (nextState.email !== this.state.email) {
            return true;
        }
        if (nextProps.error !== this.props.error) {
            return true;
        }
        return false;
    }

    emailChangeHandler = (e) => {
        const value = e.target.value.trim();

        if (value.length > 0 & this.state.disabled) {
            this.setState({
                disabled: false
            });
        }
        if (value.length === 0 & !this.state.disabled) {
            this.setState({
                disabled: true
            });
        }

        this.setState({
            email: value,
        });
    }

    submitClickHandler = () => {
        const email = this.state.email;

        if (email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) === null) {
            this.props.onSubmitError();
        } else {
            this.props.onRedirectInfo();
            setTimeout(() => {
                this.props.onSubmitEmail(email);
            }, 2000);
        }
    }

    cancelClickHandler = () => {
        this.props.onCancel();
    }

    errorClickHandler = () => {
        this.props.onErrorHandler();
    }

    render() {

        const Loading = <Load />;

        const notValid = <NotValid children={this.props.errorMessage} onClick={this.errorClickHandler} />;

        const Redirect = <Redir />;

        const Page = <FinderComponent type={'email'} value={this.state.email}
            onChange={this.emailChangeHandler.bind(this)} children={this.state.email}
            onClickSubmit={this.submitClickHandler} onClickCancel={this.cancelClickHandler}
            disabled={this.state.disabled}
        />;

        const Content = this.props.error ? notValid : this.props.loading ?
            Loading : this.props.submit ? Redirect : Page;

        return Content;
    }
}

const mapStateToProps = state => {
    return {
        loading: state.fog.loading,
        submit: state.fog.submit,
        error: state.fog.error,
        errorMessage: state.fog.errorMessage,
        redirect: state.fog.redirect,
        redirectPath: state.fog.redirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onRedirect: () => dispatch(redirectHandler()),
        onRedirectInfo: () => dispatch(redirectInfo()),
        onLoading: () => dispatch(loadingHandler()),
        onSubmitEmail: (email) => dispatch(submitForgot(email)),
        onSubmitError: () => dispatch(submitError()),
        onErrorHandler: () => dispatch(errorHandler()),
        onCancel: () => dispatch(cancelHandler())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserFinder);