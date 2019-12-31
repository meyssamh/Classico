import React from 'react';

import PropTypes from 'prop-types';

import classes from './ui.module.scss';

const buttonLeft = props => {
    return (
        <button className={classes.buttonLeft} onClick={props.onClickLeft}></button>
    );
}

buttonLeft.propTypes = {
    onClickLeft: PropTypes.func
}

export default buttonLeft;