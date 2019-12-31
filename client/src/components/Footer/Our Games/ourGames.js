import React from 'react';

import { Link } from 'react-router-dom';

import classes from './ourGames.module.scss';

const ourGames = () => {
    return (
        <ul className={classes.list}>
            <li className={classes.title}>
                <Link className={classes.listTitle} to={'#0'}>Our Games</Link>
            </li>
            <li className={classes.listItems}>
                <Link className={classes.listItem} to={'#1'}>Tetris</Link>
            </li>
            <li className={classes.listItems}>
                <Link className={classes.listItem} to={'#2'}>Snake</Link>
            </li>
            <li className={classes.listItems}>
                <Link className={classes.listItem} to={'#3'}>Pac-Man</Link>
            </li>
            <li className={classes.listItems}>
                <Link className={classes.listItem} to={'#4'}>Minesweeper</Link>
            </li>
            <li className={classes.listItems}>
                <Link className={classes.listItem} to={'#5'}>Pong</Link>
            </li>
            <li className={classes.listItems}>
                <Link className={classes.listItem} to={'#6'}>Space Invaders</Link>
            </li>
        </ul>
    );
}

export default ourGames;