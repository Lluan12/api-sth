import { format, join } from "path";
import swaggerJsdoc, { OAS3Definition, OAS3Options } from "swagger-jsdoc";

const swaggerDefinition: OAS3Definition = {
  openapi: "3.0.0",
  info: {
    title: "API de Soluciones Topograficas Hernandez",
    version: "1.0.0",
    description: "Descripcion de las rutas de los Usuarios y Proyectos",
  },
  servers: [{ url: "http://localhost:3000/", description: "API local" }],
  components: {
    securitySchemes: {
      sthAuth: {
        type: "apiKey",
        name: "Authorization",
        in: "header",
        description: "Agruege tu token JWT"
      },
    },
    schemas: {
      User: {
        type: "object",
        properties: {
          _id: {
            type: "string",
            example: "5f76e3d4b03f5d0012c279c7",
          },
          name: {
            type: "string",
            example: "Juan Perez"
          },
          email: {
            type: "string",
            example: "correo@correo.com",
          },
          password: {
            type: "string",
            example: "12345",
          },
          created: {
            type: "string",
            format: "date",
            example: "2025-06-23T07:00:00.000Z",
          },
          updated: {
            type: "string",
            format: "date",
            example: "2025-06-23T07:00:00.000Z",
          },
        },
      },
      Project: {
        type: "object",
        properties: {
          _id: {
            type: "string",
            example: "5f76e3d4b03f5d0012c279c7",
          },
          title: {
            type: "string",
            example: "theTitle",
          },
          description: {
            type: "string",
            example: "description of the project",
          },
          images: {
            type: "array",
            items: {
              type: "string",
            },
          },
          created: {
            type: "string",
            format: "date-time",
            example: "2025-06-23T07:00:00.000Z",
          },
          updated: {
            type: "string",
            format: "date-time",
            example: "2025-06-23T07:00:00.000Z",
          },
        },
      },
      Validate: {
        type: "object",
        properties: {
          errors: {
            type: "array",
            items: {
              type: "object",
              properties: {
                type: {
                  type: "string",
                  example: "filed",
                },
                value: {
                  type: "string",
                  example: "12345",
                },
                msg: {
                  type: "string",
                  example: "Password must be at least 8 characters",
                },
                path: {
                  type: "string",
                  example: "password",
                },
                location: {
                  type: "string",
                  example: "body",
                },
              },
            },
          },
        },
      },
    },
  },
};

const swaggerOptions: OAS3Options = {
  swaggerDefinition: swaggerDefinition,
  apis: [join(__dirname, "../routes", "*.ts")],
};

export default swaggerJsdoc(swaggerOptions);
