import React from 'react';

import WithClass from '../../../../hoc/WithClass';
import Title from '../../../UI/title';
import Text from '../../../UI/text';
import Input from '../../../UI/input';
import SubmitButton from '../../../UI/buttonSolid';
import CancelButton from '../../../UI/buttonOutline';
import classes from './finder.module.scss';

const finderComponent = props => {
    return (
        <WithClass>
            <div className={classes.title}>
                <Title>We will reset your</Title>
                <div className={classes.empty}></div>
                <Title>password, don't worry!</Title>
            </div>
            <div className={classes.text}>
                <Text children={'Enter your email:'} />
            </div>
            <div className={classes.input}>
                <Input type={props.type} value={props.value} autoFocus={true}
                    onChange={props.onChange} children={props.children}
                />
            </div>
            <div className={classes.buttons}>
                <SubmitButton children={'Submit'} onClick={props.onClickSubmit}
                    disabled={props.disabled}
                />
                <CancelButton children={'Cancel'} onClick={props.onClickCancel} />
            </div>
        </WithClass>
    );
}

export default finderComponent;