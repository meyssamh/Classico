import React from 'react';

import PropTypes from 'prop-types';

import classes from './ui.module.scss';

const buttonDown = props => {
    return (
        <button className={classes.buttonDown} onClick={props.onClickDown}></button>
    );
}

buttonDown.propTypes = {
    onClickDown: PropTypes.func
}

export default buttonDown;