import React from 'react';

import PropTypes from 'prop-types';

import classes from './game.module.scss';

const game = props => {
    return (
        <div className={classes.game}>
            <p className={classes.text} name={props.name}>{props.children}</p>
            <div className={classes.buttons}>
                <button className={classes.play} onClick={props.onClickPlay} name={props.name}>
                    Play
                </button>
                <button className={classes.delete} onClick={props.onClickDelete} name={props.name}>
                    Delete
                </button>
            </div>
        </div>
    );
}

game.propTypes = {
    name: PropTypes.string,
    children: PropTypes.string,
    onClickPlay: PropTypes.func,
    onClickDelete: PropTypes.func
}

export default game;