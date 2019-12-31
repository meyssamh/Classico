import React from 'react';

import WithClass from '../../../../hoc/WithClass';
import Title from '../../../UI/title';
import Text from '../../../UI/text';
import Input from '../../../UI/input';
import SubmitButton from '../../../UI/buttonSolid';
import CancelButton from '../../../UI/buttonOutline';
import classes from './reset.module.scss';

const resetComponent = props => {
    return (
        <WithClass>
            <div className={classes.title}>
                <Title children={'Reset you password!'} />
            </div>
            <div className={classes.text}>
                <Text children={'Enter your new password:'} />
            </div>
            <div className={classes.text}>
                <Input type={props.type} name={props.nameFirstInput} value={props.valueFirstInput}
                    onChange={props.onChange} children={props.firstChildren} autoFocus={true}
                />
            </div>
            <div className={classes.text}>
                <Text children={'Enter your new password again:'} />
            </div>
            <div className={classes.input}>
                <Input type={props.type} name={props.nameSecondInput} value={props.valueSecondInput}
                    onChange={props.onChange} children={props.secondChildren} autoFocus={false}
                />
            </div>
            <div className={classes.buttons}>
                <SubmitButton children={'Reset'} onClick={props.onClickSubmit}
                    disabled={props.disabled}
                />
                <CancelButton children={'Cancel'} onClick={props.onClickCancel} />
            </div>
        </WithClass>
    );
}

export default resetComponent;