import React, { Component, Fragment } from 'react';

import { Redirect } from 'react-router-dom';

import Unauth from '../../../components/Error/401/unauthorized';

class Unauthorized extends Component {
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
                <Unauth onClick={this.onClickHandler} />
            </Fragment>
        );
    }
}

export default Unauthorized;