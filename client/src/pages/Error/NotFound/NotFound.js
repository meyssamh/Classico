import React, { Component, Fragment } from 'react';

import { Redirect } from 'react-router-dom';

import NFound from '../../../components/Error/404/notFound';

class NotFound extends Component {
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
                <NFound onClick={this.onClickHandler} />
            </Fragment>
        );
    }
}

export default NotFound;