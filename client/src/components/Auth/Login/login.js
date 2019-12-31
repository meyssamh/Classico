import React from 'react';

import { Link } from 'react-router-dom';

import WithClass from '../../../hoc/WithClass';
import Title from '../../UI/title';
import Text from '../../UI/text';
import Input from '../../UI/input';
import SubmitButton from '../../UI/buttonSolid';
import CancelButton from '../../UI/buttonOutline';
import classes from './login.module.scss';

const login = props => {
    return (
        <WithClass>
            <div className={classes.main_mobile}>
                <div className={classes.title}>
                    <Title>It's nice to see you</Title>
                    <div className={classes.empty}></div>
                    <Title>here again!</Title>
                </div>
                <div className={classes.text}>
                    <Text children={'Enter your password:'} />
                </div>
                <div className={classes.input}>
                    <Input type={props.type} value={props.value} onChange={props.onChange}
                        children={props.children} autoFocus={true}
                    />
                </div>
                <div className={classes.forgot}>
                    <Link to={'/forgot'} className={classes.link}>
                        <Text children={'Forgot your password?'} />
                    </Link>
                </div>
                <div className={classes.buttons}>
                    <SubmitButton children={'Login'} onClick={props.onClickSubmit}
                        disabled={props.disabled}
                    />
                    <CancelButton children={'Cancel'} onClick={props.onClickCancel} />
                </div>
            </div>
        </WithClass>
    );
}

export default login;