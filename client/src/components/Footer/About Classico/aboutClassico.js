import React from 'react';

import { Link } from 'react-router-dom';

import classes from './aboutClassico.module.scss';

const ourGames = () => {
    return (
        <ul className={classes.list}>
            <li className={classes.title}>
                <Link className={classes.listTitle} to={'#0'}>About Classico</Link>
            </li>
            <li className={classes.listItems}>
                <Link className={classes.listItem} to={'#1'}>About us</Link>
            </li>
            <li className={classes.listItems}>
                <Link className={classes.listItem} to={'#2'}>FAQ</Link>
            </li>
            <li className={classes.listItems}>
                <Link className={classes.listItem} to={'#3'}>Terms & Conditions</Link>
            </li>
        </ul>
    );
}

export default ourGames;