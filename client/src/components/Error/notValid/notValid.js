import React from 'react';

import PropTypes from 'prop-types';

import WithClass from '../../../hoc/WithClass';
import classes from './notValid.module.scss';

const notValid = props => {
    return (
        <WithClass>
            <div className={classes.error_main}>
                <div className={classes.error}>
                    <p className={classes.error_title}>
                        Error!
                    </p>
                    <p className={classes.error_message}>
                        {props.children}
                    </p>
                    <button className={classes.button} onClick={props.onClick}>OK!</button>
                </div>
            </div>
        </WithClass>
    );
}

notValid.propTypes = {
    children: PropTypes.string,
    onClick: PropTypes.func,
}

export default notValid;