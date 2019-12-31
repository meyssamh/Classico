import React from 'react';

import Title from '../../../components/UI/title';
import Button from '../../../components/UI/buttonSolid';
import BigButton from '../../../components/UI/buttonGameBoy';
import ButtonLeft from '../../../components/UI/buttonLeft';
import ButtonDown from '../../../components/UI/buttonDown';
import ButtonRight from '../../../components/UI/buttonRight';
import ButtonUp from '../../../components/UI/buttonUp';
import classes from './unauthorized.module.scss';

const unauthorized = props => {
    return (
        <main className={classes.main}>
            <div className={classes.screen}>
                <div className={classes.error}></div>
                <div className={classes.image}></div>
                <button className={classes.redirect} onClick={props.onClick}></button>
                <div className={classes.title}>
                    <Title>unauthorized!</Title>
                </div>
                <div className={classes.button}>
                    <Button onClick={props.onClick}>Home Page</Button>
                </div>
            </div>
            <div className={classes.d_pad}>
                <div className={classes.d_pad_up}>
                    <ButtonUp />
                </div>
                <div className={classes.d_pad_left}>
                    <ButtonLeft />
                </div>
                <div className={classes.d_pad_down}>
                    <ButtonDown />
                </div>
                <div className={classes.d_pad_right}>
                    <ButtonRight />
                </div>
            </div>
            <div className={classes.control}>
                <div className={classes.buttonA}>
                    <BigButton />
                    <p className={classes.textA}>A</p>
                </div>
                <div className={classes.buttonB}>
                    <BigButton />
                    <p className={classes.textB}>B</p>
                </div>
            </div>
        </main>
    );
}

export default unauthorized;