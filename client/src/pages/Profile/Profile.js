import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Load from '../../components/Loading/loading';
import Pro from '../../components/Profile/profile';
import NotValid from '../../components/Error/notValid/notValid';
import Unauth from '../Error/Unauthorized/Unauthorized';
import { loadingHandler, errorHandler } from '../../store/actions/profile';
import { signoutHandler } from '../../store/actions/library';

class Profile extends Component {

    componentDidMount() {
        if (!localStorage.getItem('isLogedin')) {
            return <Redirect to='/' />
        }
        this.props.onLoading();
    }

    shouldComponentUpdate(nextProps) {
        const path = nextProps.redirectPath;
        const pathSignOut = nextProps.redirectPathSignOut;
        if (nextProps.redirect) {
            this.props.history.push('/' + path);
        }
        if (nextProps.redirectSignOut) {
            this.props.history.push('/' + pathSignOut);
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

    libraryHandler = () => {
        setTimeout(() => {
            this.props.history.push('/library');
        }, 1000)
    }

    playHandler = (game) => {
        const name = game.toLowerCase();
        this.props.history.push('/' + name);
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

        const Page = <Pro onClickPlay={(game) => this.playHandler(game)}
            onClickLibrary={this.libraryHandler} onClickSignOut={this.signOutHandler}
        />;

        const Content = !localStorage.getItem('isLogedin') ? Unauthorized :
            this.props.loading ? Loading : this.props.error ? notValid : Page;

        return Content;
    }
}

const mapStateToProps = state => {
    return {
        loading: state.pro.loading,
        changes: state.pro.changes,
        error: state.pro.error,
        errorMessage: state.pro.errorMessage,
        redirect: state.pro.redirect,
        redirectPath: state.pro.redirectPath,
        redirectSignOut: state.lib.redirect,
        redirectPathSignOut: state.lib.redirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLoading: () => dispatch(loadingHandler()),
        onErrorHandler: () => dispatch(errorHandler()),
        onSignOut: () => dispatch(signoutHandler())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);