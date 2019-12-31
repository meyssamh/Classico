import React from 'react';

import PropTypes from 'prop-types';

import classes from './ui.module.scss';

const buttonSolid = props => {
    return (
        <button className={classes.solid} onClick={props.onClick} disabled={props.disabled}>
            {props.children}
        </button>
    );
}

buttonSolid.propTypes = {
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    children: PropTypes.string
}

export default buttonSolid;