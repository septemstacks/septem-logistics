import Validator from 'validator';
import { isEmpty } from '../../isEmpty';

import { User } from '../../../models/User';
import { ErrorObject, Role, UserRole } from '../../../utils/constants';

export const validateRegisterUser = (data: User): ErrorObject<User> => {
    let errors = {} as User;

    data.email = !isEmpty(data.email) ?  data.email : '';
    data.firstName = !isEmpty(data.firstName) ?  data.firstName : '';
    data.lastName = !isEmpty(data.lastName) ?  data.lastName : '';
    data.password = !isEmpty(data.password) ?  data.password : '';
    data.confirmPassword = !isEmpty(data.confirmPassword) ?  data.confirmPassword : '';
    data.role = !isEmpty(data.role) ?  data.role : '' as UserRole;

    if (!Validator.isEmail(data.email)) {
        errors.email = 'Invalid Email Address!';
    }
    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email Address is required!';
    }

    if (Validator.isEmpty(data.firstName)) {
        errors.firstName = 'First Name is required!';
    }

    if (Validator.isEmpty(data.lastName)) {
        errors.lastName = 'Last Name is required!';
    }

    if (!Validator.isLength(data.password!, { min: 8 })) {
        errors.password = 'Password must be at least 8 characters long!';
    }
    if (Validator.isEmpty(data.password!)) {
        errors.password = 'Password is required!';
    }
    if (Validator.isEmpty(data.confirmPassword!)) {
        errors.confirmPassword = 'Confirm your password!';
    }
    if (data.confirmPassword !== data.password) {
        errors.confirmPassword = 'Passwords do not match!';
    }

    if (!(data.role.toUpperCase() in Role)) {
        errors.role = `Invalid user role '${data.role}'!` as UserRole;
    }
    if (Validator.isEmpty(data.role)) {
        errors.role = 'User role is required!' as UserRole;
    }
    
    return {
        errors,
        isValid: isEmpty(errors)
    } as ErrorObject<User>;
};