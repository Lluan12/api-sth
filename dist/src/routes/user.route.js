"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const login_validator_1 = __importDefault(require("../validators/login.validator"));
const user_controller_1 = require("../controllers/user.controller");
const validate_1 = __importDefault(require("../middlewares/validate"));
const user_validator_1 = __importDefault(require("../validators/user.validator"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const userUpdate_validator_1 = __importDefault(require("../validators/userUpdate.validator"));
const userRouter = (0, express_1.Router)();
// Login user
/**
 * @swagger
 * /api/users/login:
 *  post:
 *    tags: [User]
 *    summary: Login to the system
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            allOf:
 *              - $ref: '#components/schemas/User'
 *            properties:
 *              _id:
 *                readOnly: true
 *              name:
 *                readOnly: true
 *              created:
 *                readOnly: true
 *              updated:
 *                readOnly: true
 *    responses:
 *      200:
 *        description: The token being send
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                token:
 *                  type: string
 *      400:
 *        description: The email and/or password are invalids
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schemas/Validate'
 *      404:
 *        description: The email and/or password dont match
 */
userRouter.post("/login", (0, express_validator_1.checkSchema)(login_validator_1.default), validate_1.default, user_controller_1.userController.loginUser);
// Get users
/**
 * @swagger
 * /api/users:
 *  get:
 *    tags: [User]
 *    summary: Get all users
 *    description: Get the list of all users
 *    security:
 *      - sthAuth: []
 *    responses:
 *      200:
 *        description: The users are returned
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                $ref: '#components/schemas/User'
 *      401:
 *        description: Not authorized, missing token
 *      403:
 *        description: Token invalid
 *      404:
 *        description: There are not users
 */
userRouter.get("/", auth_1.default, user_controller_1.userController.getUsers);
// Get user by id
/**
 * @swagger
 * /api/users/{id}:
 *  get:
 *    tags: [User]
 *    summary: Get a user
 *    description: Get a user by id
 *    security:
 *      - sthAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *        description: ID of user
 *    responses:
 *      200:
 *        description: The user beign returned
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#components/schemas/User'
 *      401:
 *        description: Not authorized, missing token
 *      403:
 *        description: Token invalid
 *      404:
 *        description: User not found
 */
userRouter.get("/:id", auth_1.default, user_controller_1.userController.getUser);
// Create user
/**
 * @swagger
 * /api/users:
 *  post:
 *    tags: [User]
 *    summary: Create a user
 *    security:
 *      - sthAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            allOf:
 *              - $ref: '#components/schemas/User'
 *            properties:
 *              _id:
 *                readOnly: true
 *              created:
 *                readOnly: true
 *              updated:
 *                 readOnly: true
 *    responses:
 *      201:
 *        description: Create a user being returned
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#components/schemas/User'
 *      400:
 *        description: The data are invalid
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schemas/Validate'
 *      401:
 *        description: Not authorized, missing token
 *      403:
 *        description: Token invalid
 */
userRouter.post("/", auth_1.default, (0, express_validator_1.checkSchema)(user_validator_1.default), validate_1.default, user_controller_1.userController.createUser);
// Update a user
/**
 * @swagger
 * /api/users/{id}:
 *  put:
 *    tags: [User]
 *    summary: Update a user
 *    description: Update a user by id
 *    security:
 *      - sthAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            allOf:
 *              - $ref: '#components/schemas/User'
 *            properties:
 *              _id:
 *                readOnly: true
 *              created:
 *                readOnly: true
 *              updated:
 *                readOnly: true
 *              password:
 *                readOnly: true
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: ID of user
 *    responses:
 *      200:
 *        description: Update user and return it
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#components/schemas/User'
 *      400:
 *        description: The data are invalid
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schemas/Validate'
 *      401:
 *        description: Not authorized, missing token
 *      403:
 *        description: Token invalid
 *      404:
 *        description: User not found
 */
userRouter.put("/:id", auth_1.default, (0, express_validator_1.checkSchema)(userUpdate_validator_1.default), validate_1.default, user_controller_1.userController.updateUser);
// Delete a user
/**
 * @swagger
 * /api/users/{id}:
 *  delete:
 *    tags: [User]
 *    summary: Delete a user
 *    description: Delete a user by id
 *    security:
 *      - sthAuth: []
 *    parameters:
 *      - in: path
 *        required: true
 *        name: id
 *        description: ID of user
 *    responses:
 *      200:
 *        description: Operation successful
 *      401:
 *        description: Not authorized, missing token
 *      403:
 *        description: Token invalid
 *      404:
 *        description: User not found
 */
userRouter.delete("/:id", auth_1.default, user_controller_1.userController.deleteUser);
exports.default = userRouter;
