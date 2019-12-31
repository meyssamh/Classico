import React from 'react';

import PropTypes from 'prop-types';

import classes from './ui.module.scss';

const buttonRight = props => {
    return (
        <button className={classes.buttonRight} onClick={props.onClickRight}></button>
    );
}

buttonRight.propTypes = {
    onClickRight: PropTypes.func
}

export default buttonRight;