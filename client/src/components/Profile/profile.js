import React from 'react';

import WithClass from '../../hoc/WithClass';
import Title from '../UI/title';
import Games from './games/games';
import Button from '../UI/buttonSolid';
import classes from './profile.module.scss';

const profile = props => {
    return (
        <WithClass>
            <div className={classes.signout}>
                <button className={classes.signout_button} onClick={props.onClickSignOut}>Sign out</button>
            </div>
            <div className={classes.title}>
                <Title>Profile</Title>
            </div>
            <div className={classes.games}>
                <Games onClickPlay={props.onClickPlay} />
            </div>
            <div className={classes.button}>
                <Button onClick={props.onClickLibrary}>Library</Button>
            </div>
        </WithClass>
    );
}

export default profile;