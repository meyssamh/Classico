import React from 'react';

import PropTypes from 'prop-types';

import classes from './ui.module.scss';

const input = props => {
    return (
        <div className={classes.input_container}>
            <input className={classes.input} type={props.type} name={props.name}
                value={props.value} onChange={props.onChange} formNoValidate
                autoFocus={props.autoFocus}
            />
            <p className={classes.input_output}>{props.children}_</p>
        </div>
    );
}

input.propTypes = {
    children: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    autoFocus: PropTypes.bool
}

export default input;