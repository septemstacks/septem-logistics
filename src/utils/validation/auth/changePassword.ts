import Validator from 'validator';
import { isEmpty } from '../../isEmpty';

import { ErrorObject } from '../../../utils/constants';

export interface ChangePasswordData {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export const validateChangePassword = (data: ChangePasswordData): ErrorObject<ChangePasswordData> => {
    let errors = {} as ChangePasswordData;

    data.currentPassword = !isEmpty(data.currentPassword) ?  data.currentPassword : '';
    data.newPassword = !isEmpty(data.newPassword) ?  data.newPassword : '';
    data.confirmPassword = !isEmpty(data.confirmPassword) ?  data.confirmPassword : '';

    if (Validator.isEmpty(data.currentPassword)) {
        errors.currentPassword = 'Your current password is required!';
    }

    if (!Validator.isLength(data.newPassword, { min: 8 })) {
        errors.newPassword = 'Password must be at least 8 characters long!';
    }
    if (Validator.isEmpty(data.newPassword)) {
        errors.newPassword = 'Password is required!';
    }

    if (!Validator.equals(data.newPassword, data.confirmPassword)) {
        errors.confirmPassword = 'Passwords must match!';
    }
    if (Validator.isEmpty(data.confirmPassword!)) {
        errors.confirmPassword = 'Please confirm your password!';
    }
    
    return {
        errors,
        isValid: isEmpty(errors)
    } as ErrorObject<ChangePasswordData>;
};