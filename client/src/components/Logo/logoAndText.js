import React from 'react';

import logo from '../../assets/images/Classico logo.png';
import classes from './logo.module.scss';

const logoAndText = () => {
    return (
        <img className={classes.logo} src={logo} alt={'logo'} />
    );
}

export default logoAndText;