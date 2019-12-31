import React from 'react';

import WithClass from '../../../hoc/WithClass';
import Title from '../../UI/title';
import classes from './redirect.module.scss';

const redirect = () => {
    return (
        <WithClass>
            <div className={classes.redirect}>
                <Title children={'Check your email.'} />
                <div className={classes.empty}></div>
                <Title children={'You will be soon redirected'} />
                <div className={classes.empty}></div>
                <Title children={'to homepage!'} />
            </div>
        </WithClass>
    );
}

export default redirect;