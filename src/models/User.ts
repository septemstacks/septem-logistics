import { Document, Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

import { UserRole, Role } from '../utils/constants';

export interface User extends Document {
    _id?: string;
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    confirmPassword?: string;
    address?: String,
    phone?: String,
    createdAt?: Date;
    updatedAt?: Date;
    avatar?: string;
    avatarKey?: string;
    role: UserRole;
    resetPasswordToken?: string;
    resetPasswordExpire?: Date;
    matchPassword(password: string): boolean;
    getResetPasswordToken(): string;
}

const UserSchema = new Schema<User>({
    email: {
        type: String,
        required: [true, 'Email address is required!'],
        lowercase: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email address!'],
        trim: true
    },

    firstName: {
        type: String,
        uppercase: true,
        required: [true, 'First name is required!'],
        trim: true
    },

    lastName: {
        type: String,
        uppercase: true,
        required: [true, 'Last name is required!'],
        trim: true
    },

    password: {
        type: String,
        required: [true, 'Password is required!'],
        minlength: [8, 'Password must be at least 8 characters long!'],
        select: false,
        trim: true
    },

    address: {
        type: String,
        trim: true
    },

    phone: {
        type: String,
        trim: true
    },
    role: {
        type: String,
        required: true,
        enum: [Role.ADMIN, Role.USER],
        uppercase: true,
        trim: true
    },

    avatar: {
        type: String,
    },

    avatarKey: {
        type: String,
    },

    resetPasswordToken: String,

    resetPasswordExpire: Date
}, { timestamps: true });

// Encrypt user password using brcypt
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password!, salt);
    next();
});

// Sig JWT and return
UserSchema.methods.getSignedJwtToken = function () {
    // const secret: Secret = !;
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET!, {
        expiresIn: process.env.JWT_EXPIRE
    });
}

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password);
}

// Generate and hash password token
UserSchema.methods.getResetPasswordToken = function () {
    // Generate token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash token and set to resetPassword token field
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    // Set expire
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000 // 10 minutes
    console.log('resetPasswordExpire', this.resetPasswordExpire);
    
    return resetToken;
}

UserSchema.index({'$**': 'text'});
export default model<User>('User', UserSchema);