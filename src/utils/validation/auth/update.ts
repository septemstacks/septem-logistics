import Validator from 'validator';
import { isEmpty } from '../../isEmpty';

import { User } from '../../../models/User';
import { ErrorObject, Role, UserRole } from '../../constants';

export const validateUpdateUser = (data: User): ErrorObject<User> => {
    let errors = {} as User;

    data.email = !isEmpty(data.email) ?  data.email : '';
    data.firstName = !isEmpty(data.firstName) ?  data.firstName : '';
    data.lastName = !isEmpty(data.lastName) ?  data.lastName : '';
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