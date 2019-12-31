import React from 'react';

import WithClass from '../../hoc/WithClass';
import Title from '../UI/title';
import classes from './loading.module.scss';

const loading = () => {
    return (
        <WithClass>
            <div className={classes.loading}>
                <Title children={'Loading ...'} />
            </div>
        </WithClass>
    );
};

export default loading;