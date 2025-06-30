import { Schema } from "express-validator";

const loginValidator: Schema = {
  email: {
    exists: {
      errorMessage: "Email not send",
      bail: true,
    },
    isEmail: {
      errorMessage: "Email not valid",
      bail: true
    },
    trim: true,
    notEmpty: {
      errorMessage: "Email must not empty",
      bail: true,
    },
    escape: true,
    normalizeEmail: true,
  },
  password: {
    exists: {
      errorMessage: "Password not send",
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
    },
    escape: true,
  },
};

export default loginValidator;
