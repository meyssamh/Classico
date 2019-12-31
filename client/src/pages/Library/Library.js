import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Load from '../../components/Loading/loading';
import Lib from '../../components/Library/library';
import NotValid from '../../components/Error/notValid/notValid';
import Unauth from '../Error/Unauthorized/Unauthorized';
import { loadingHandler, errorHandler, signoutHandler } from '../../store/actions/library';

class Library extends Component {

    componentDidMount() {
        if (!localStorage.getItem('isLogedin')) {
            return <Redirect to='/' />
        }
        this.props.onLoading();
    }

    shouldComponentUpdate(nextProps) {
        const path = nextProps.redirectPath;
        if (nextProps.redirect) {
            this.props.history.push('/' + path);
        }
        if (nextProps.loading !== this.props.loading) {
            return true;
        }
        if (nextProps.changes !== this.props.changes) {
            return true;
        }
        if (nextProps.error !== this.props.error) {
            return true;
        }
        return false;
    }

    profileHandler = () => {
        this.props.history.push('/profile');
    }

    errorClickHandler = () => {
        this.props.onErrorHandler();
    }

    signOutHandler = () => {
        this.props.onSignOut();
    }

    render() {
        const Unauthorized = <Unauth />

        const Loading = <Load />;

        const notValid = <NotValid children={this.props.errorMessage} onClick={this.errorClickHandler} />;

        const Page = <Lib onClickProfile={this.profileHandler} onClickSignOut={this.signOutHandler} />;

        const Content = !localStorage.getItem('isLogedin') ? Unauthorized :
            this.props.loading ? Loading : this.props.error ? notValid : Page;

        return Content;
    }
}

const mapStateToProps = state => {
    return {
        loading: state.lib.loading,
        changes: state.lib.changes,
        error: state.lib.error,
        errorMessage: state.lib.errorMessage,
        redirect: state.lib.redirect,
        redirectPath: state.lib.redirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLoading: () => dispatch(loadingHandler()),
        onErrorHandler: () => dispatch(errorHandler()),
        onSignOut: () => dispatch(signoutHandler())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Library);