import { Schema } from "express-validator";

const projectValidator: Schema = {
  title: {
    exists: {
      errorMessage: "Title must be send",
      bail: true,
    },
    isString: {
      errorMessage: "Title must be a string",
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
    exists: {
      errorMessage: "Description must be send",
      bail: true,
    },
    isString: {
      errorMessage: "Description must be a string",
      bail: true,
    },
    trim: true,
    notEmpty: {
      errorMessage: "Description must not be empty",
      bail: true,
    },
    escape: true,
  },
};

export default projectValidator;
