"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userValidator = {
    name: {
        exists: {
            errorMessage: "Name must be send",
            bail: true,
        },
        isString: {
            errorMessage: "Name must be a string",
            bail: true,
        },
        trim: true,
        notEmpty: {
            errorMessage: "Name not must be empty",
            bail: true,
        },
        escape: true,
    },
    email: {
        exists: {
            errorMessage: "Email must be send",
            bail: true,
        },
        isEmail: {
            errorMessage: "Email is not valid",
            bail: true,
        },
        trim: true,
        notEmpty: {
            errorMessage: "Email not must be empty",
            bail: true,
        },
        escape: true,
    },
    password: {
        exists: {
            errorMessage: "Password must be send",
            bail: true,
        },
        isString: {
            errorMessage: "Password must be a string",
            bail: true,
        },
        trim: true,
        isLength: {
            options: { min: 8 },
            errorMessage: "Password must be at least 8 characters",
            bail: true,
        },
        escape: true,
    },
};
exports.default = userValidator;
