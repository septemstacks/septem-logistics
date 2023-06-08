import Validator from 'validator';
import { isEmpty } from '../../isEmpty';

import { ErrorObject } from '../../../utils/constants';

export interface LoginData {
    email: string;
    password: string;
}

export const validateLoginUser = (data: LoginData): ErrorObject<LoginData> => {
    let errors = {} as LoginData;

    data.email = !isEmpty(data.email) ?  data.email : '';
    data.password = !isEmpty(data.password) ?  data.password : '';

    if (!Validator.isEmail(data.email)) {
        errors.email = 'Invalid email address!';
    }
    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email Address is required!';
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password is required!';
    }
    
    return {
        errors,
        isValid: isEmpty(errors)
    } as ErrorObject<LoginData>;
};