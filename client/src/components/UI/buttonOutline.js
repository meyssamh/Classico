import React from 'react';

import PropTypes from 'prop-types';

import classes from './ui.module.scss';

const buttonOutline = props => {
    return (
        <button className={classes.outline} onClick={props.onClick} disabled={props.disabled}>
            {props.children}
        </button>
    );
}

buttonOutline.propTypes = {
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    children: PropTypes.string
}

export default buttonOutline;