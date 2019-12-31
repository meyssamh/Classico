import React, { Component } from 'react';

import HomePage from '../../components/Home Page/homePage';

class Homepage extends Component {

    buttonHandler = () => {
        this.props.history.push('/account');
    }

    render() {
        return <HomePage onClick={this.buttonHandler} />;
    }
}

export default Homepage;