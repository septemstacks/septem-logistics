export enum Role {
    ADMIN = 'ADMIN',
    USER = 'USER',
}

export type UserRole = `${Role}`;

export interface ErrorObject<T> {
    errors: T;
    isValid: boolean;
};