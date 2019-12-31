import React from 'react';

import PropTypes from 'prop-types';

import classes from './ui.module.scss';

const title = props => <p className={classes.title}>{props.children}</p>

title.propTypes = {
    children: PropTypes.string
}

export default title;