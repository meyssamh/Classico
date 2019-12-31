import React from 'react';

import classes from './footer.module.scss';
import Logo from '../Logo/logoAndText';
import OurGames from './Our Games/ourGames';
import AboutClassico from './About Classico/aboutClassico';
import ContactUs from './Contact Us/contactUs';

const footer = () => {
    return (
        <footer className={classes.footer}>
            <div className={classes.footerItems}>
                <div  className={classes.logo}>
                    <Logo />
                </div>
                <OurGames />
                <AboutClassico />
                <ContactUs />
            </div>
        </footer>
    );
}

export default footer;