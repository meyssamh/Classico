import React from 'react';

import PropTypes from 'prop-types';

import classes from './ui.module.scss';

const buttonUp = props => {
    return (
        <button className={classes.buttonUp} onClick={props.onClickUp}></button>
    );
}

buttonUp.propTypes = {
    onClickUp: PropTypes.func
}

export default buttonUp;