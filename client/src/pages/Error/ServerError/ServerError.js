import React, { Component, Fragment } from 'react';

import { Redirect } from 'react-router-dom';

import SError from '../../../components/Error/500/serverError';

class ServerError extends Component {
    state = {
        redirect: false
    }

    onClickHandler = () => {
        this.setState({
            redirect: true
        });
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/' />
        }
    }

    render() {
        return (
            <Fragment>
                {this.renderRedirect()}
                <SError onClick={this.onClickHandler} />
            </Fragment>
        );
    }
}

export default ServerError;