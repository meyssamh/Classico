import React from 'react';

import PropTypes from 'prop-types';

import classes from './ui.module.scss';

const text = props => <p className={classes.text} name={props.name}>{props.children}</p>

text.propTypes = {
    name: PropTypes.string
}

export default text;