import { Router } from "express";
import { checkSchema } from "express-validator";
import validate from "../middlewares/validate";
import projectValidator from "../validators/project.valdator";
import middlewareMulter from "../middlewares/upload";
import { projectController } from "../controllers/project.controller";
import authMiddleware from "../middlewares/auth";
import projectUpdateValidator from "../validators/projectUpdate.validator";

const projectRouter = Router();

// Get projects

/**
 * @swagger
 * /api/projects:
 *  get:
 *    tags: [Project]
 *    summary: Get all projects
 *    description: Get the list of all projects
 *    responses:
 *      200:
 *        description: The projects are returned
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                $ref: '#components/schemas/Project'
 *      404:
 *        description: There are not projects
 */
projectRouter.get("/", projectController.getProjects);

// Get project by id

/**
 * @swagger
 * /api/projects/{id}:
 *  get:
 *    tags: [Project]
 *    summary: Get a project
 *    description: Get a project by id
 *    parameters:
 *      - in: path
 *        required: true
 *        name: id
 *        description: ID of project
 *    responses:
 *      200:
 *        description: The project are returned
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#components/schemas/Project'
 *      404:
 *        description: Project not found
 */
projectRouter.get("/:id", projectController.getProject);

// Create project

/**
 * @swagger
 * /api/projects:
 *  post:
 *    tags: [Project]
 *    summary: Create a project
 *    security:
 *      - sthAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            allOf:
 *              - $ref: '#components/schemas/Project'
 *            properties:
 *              _id:
 *                readOnly: true
 *              images:
 *                readOnly: true
 *              created:
 *                readOnly: true
 *              updated:
 *                 readOnly: true
 *    responses:
 *      201:
 *        description: Create a project being returned
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#components/schemas/Project'
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
projectRouter.post(
  "/",
  authMiddleware,
  checkSchema(projectValidator),
  validate,
  projectController.createProject
);

// Update a project

/**
 * @swagger
 * /api/projects/{id}:
 *  put:
 *    tags: [Project]
 *    summary: Update a project
 *    description: Update a project by id
 *    security:
 *      - sthAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            allOf:
 *              - $ref: '#components/schemas/Project'
 *            properties:
 *              _id:
 *                readOnly: true
 *              created:
 *                readOnly: true
 *              updated:
 *                readOnly: true
 *              images:
 *                readOnly: true
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: ID of project
 *    responses:
 *      200:
 *        description: Update project and return it
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#components/schemas/Project'
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
 *        description: Project not found
 */
projectRouter.put(
  "/:id",
  authMiddleware,
  checkSchema(projectUpdateValidator),
  validate,
  projectController.updateProject
);

// Delete a project

/**
 * @swagger
 * /api/projects/{id}:
 *  delete:
 *    tags: [Project]
 *    summary: Delete a project
 *    description: Delete a project by id
 *    security:
 *      - sthAuth: []
 *    parameters:
 *      - in: path
 *        required: true
 *        name: id
 *        description: ID of project
 *    responses:
 *      200:
 *        description: Operation successful
 *      401:
 *        description: Not authorized, missing token
 *      403:
 *        description: Token invalid
 *      404:
 *        description: Project not found
 */
projectRouter.delete("/:id", authMiddleware, projectController.deleteProject);

// Upload images

/**
 * @swagger
 * /api/projects/upload/{id}:
 *  post:
 *    tags: [Project]
 *    summary: Upload images in a project
 *    security:
 *      - sthAuth: []
 *    parameters: 
 *      - in: path
 *        name: id
 *        required: true
 *        description: ID of project
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            type object:
 *            properties:
 *              images:
 *                type: array
 *                items:
 *                  type: string
 *                  format: binary
 *                  description: file to upload
 *    responses:
 *      201:
 *        description: Upload the images in a project being returned
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#components/schemas/Project'
 *      400:
 *        description: Images not send
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#components/schemas/Validate'
 *      401:
 *        description: Not authorized, missing token
 *      403:
 *        description: Token invalid
 */
projectRouter.post(
  "/upload/:id",
  authMiddleware,
  middlewareMulter.array("images"),
  projectController.uploadImage
);

export default projectRouter;
