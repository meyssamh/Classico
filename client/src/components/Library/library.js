import React from 'react';

import WithClass from '../../hoc/WithClass';
import Title from '../UI/title';
import Games from './games/games';
import Button from '../UI/buttonSolid';
import classes from './library.module.scss';

const library = props => {
    return (
        <WithClass>
            <div className={classes.signout}>
                <button className={classes.signout_button} onClick={props.onClickSignOut}>Sign out</button>
            </div>
            <div className={classes.title}>
                <Title>Library</Title>
            </div>
            <div className={classes.games}>
                <Games />
            </div>
            <div className={classes.button}>
                <Button onClick={props.onClickProfile} children={'Profile'} />
            </div>
        </WithClass>
    );
}

export default library;