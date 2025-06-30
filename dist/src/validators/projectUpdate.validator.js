"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const projectUpdateValidator = {
    title: {
        optional: true,
        isString: {
            errorMessage: "Title must be string",
            bail: true,
        },
        trim: true,
        notEmpty: {
            errorMessage: "Title must not be empty",
            bail: true,
        },
        escape: true,
    },
    description: {
        optional: true,
        trim: true,
        isString: {
            errorMessage: "Description must be string",
            bail: true,
        },
        notEmpty: {
            errorMessage: "Description must not be empty",
            bail: true,
        },
        escape: true,
    },
};
exports.default = projectUpdateValidator;
