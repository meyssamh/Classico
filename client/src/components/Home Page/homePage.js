import React from 'react';

import Logo from '../../components/Logo/logoAndText';
import Button from '../../components/Home Page/Button/button';
import Footer from '../../components/Footer/footer';
import classes from './homePage.module.scss';

const homepage = props => {
    return (
        <div className={classes.body}>
            <main className={classes.main}>
                <header className={classes.buttons}>
                    <div className={classes.logo}>
                        <Logo />
                    </div>
                    <div className={classes.button}>
                        <Button onClick={props.onClick} />
                    </div>
                </header>
                <p className={classes.motive}>Let's bring your memories back to life!</p>
            </main>
            <Footer />
        </div>
    );
}

export default homepage;