import { Router } from "express";
import { checkSchema } from "express-validator";
import loginValidator from "../validators/login.validator";
import { userController } from "../controllers/user.controller";
import validate from "../middlewares/validate";
import userValidator from "../validators/user.validator";
import authMiddleware from "../middlewares/auth";
import userUpdateValidator from "../validators/userUpdate.validator";

const userRouter = Router();

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
userRouter.post(
  "/login",
  checkSchema(loginValidator),
  validate,
  userController.loginUser
);

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
userRouter.get("/", authMiddleware, userController.getUsers);

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
userRouter.get("/:id", authMiddleware, userController.getUser);

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
userRouter.post(
  "/",
  authMiddleware,
  checkSchema(userValidator),
  validate,
  userController.createUser
);

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
userRouter.put(
  "/:id",
  authMiddleware,
  checkSchema(userUpdateValidator),
  validate,
  userController.updateUser
);

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
userRouter.delete("/:id", authMiddleware, userController.deleteUser);

export default userRouter;
