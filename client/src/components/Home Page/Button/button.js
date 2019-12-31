import React from 'react';

import PropTypes from 'prop-types';

import classes from './button.module.scss';

const button = props => {
    return (
        <button className={classes.button} onClick={props.onClick}>My Account</button>
    );
}

button.propTypes = {
    onClick: PropTypes.func
}

export default button;