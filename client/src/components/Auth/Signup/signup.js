import React from 'react';

import { Link } from 'react-router-dom';

import WithClass from '../../../hoc/WithClass';
import Title from '../../UI/title';
import Text from '../../UI/text';
import Input from '../../UI/input';
import SubmitButton from '../../UI/buttonSolid';
import CancelButton from '../../UI/buttonOutline';
import classes from './signup.module.scss';

const signup = props => {
    return (
        <WithClass>
            <div className={classes.title}>
                <Title>Thank you for</Title>
                <div className={classes.empty}></div>
                <Title>choosing Classico!</Title>
            </div>
            <div className={classes.text}>
                <Text children={'Enter your password:'} />
            </div>
            <div className={classes.text}>
                <Input type={props.type} name={props.nameFirstInput} value={props.valueFirstInput}
                    onChange={props.onChange} children={props.firstChildren} autoFocus={true}
                />
            </div>
            <div className={classes.text}>
                <Text children={'Enter your password again:'} />
            </div>
            <div className={classes.text}>
                <Input type={props.type} name={props.nameSecondInput} value={props.valueSecondInput}
                    onChange={props.onChange} children={props.secondChildren} autoFocus={false}
                />
            </div>
            <div className={classes.input}>
                <Text>By signing up you accept<br />
                    the <Link className={classes.link} to={'/terms'}>terms and conditions</Link>.
                </Text>
            </div>
            <div className={classes.buttons}>
                <SubmitButton children={'Sign up'} onClick={props.onClickSubmit}
                    disabled={props.disabled}
                />
                <CancelButton children={'Cancel'} onClick={props.onClickCancel} />
            </div>
        </WithClass>
    );
}

export default signup;