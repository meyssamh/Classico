import React from 'react';

import BigButton from '../components/UI/buttonGameBoy';
import ButtonLeft from '../components/UI/buttonLeft';
import ButtonDown from '../components/UI/buttonDown';
import ButtonRight from '../components/UI/buttonRight';
import ButtonUp from '../components/UI/buttonUp';
import classes from './WithClass.module.scss';

const WithClass = props => {
    return (
        <main className={classes.main}>
            <div className={classes.screen}>
                {props.children}
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
};

export default WithClass;