import React from 'react';

import PropTypes from 'prop-types';

import classes from './ui.module.scss';

const buttonGameBoy = props => {
    return (
        <button className={classes.bigButton} onClick={props.onClick}></button>
    );
}

buttonGameBoy.propTypes = {
    onClick: PropTypes.func
}

export default buttonGameBoy;