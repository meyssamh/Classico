import React from 'react';

import PropTypes from 'prop-types';

import classes from './game.module.scss';

const game = props => {
    let clas = props.disabled ? classes.disabledText : classes.text;
    return (
        <div className={classes.game}>
            <p className={clas} name={props.name}>{props.children}</p>
            <button className={classes.button} onClick={props.onClick} name={props.name}
                disabled={props.disabled}
            >
                {props.buttonText}
            </button>
        </div>
    );
}

game.propTypes = {
    disabled: PropTypes.bool,
    name: PropTypes.string,
    onClick: PropTypes.func
}

export default game;