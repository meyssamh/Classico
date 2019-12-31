import React from 'react';

import { Link } from 'react-router-dom';

import classes from './contactUs.module.scss';

const ourGames = () => {
    return (
        <ul className={classes.list}>
            <li className={classes.title}>
                <Link className={classes.listTitle} to={'#0'}>Contact us</Link>
            </li>
            <li className={classes.listItems}>
                info@classico.com
            </li>
            <li className={classes.listItems}>
                (+49) 123 456 78 90
            </li>
        </ul>
    );
}

export default ourGames;