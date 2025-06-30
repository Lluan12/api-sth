"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userUpdateValidator = {
    name: {
        optional: true,
        isString: {
            errorMessage: "Name must be a string",
            bail: true,
        },
        trim: true,
        escape: true,
        notEmpty: {
            errorMessage: "Name must not be empty",
            bail: true,
        },
    },
    email: {
        optional: true,
        isEmail: {
            errorMessage: "Email not valid",
            bail: true,
        },
        trim: true,
        escape: true,
        notEmpty: {
            errorMessage: "Name must not be empty",
            bail: true,
        },
    },
};
exports.default = userUpdateValidator;
