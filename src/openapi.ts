const errorResponses = {
  "400": {
    description: "Bad request",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/ErrorModel",
        },
      },
    },
  },
  "404": {
    description: "Not found",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/ErrorModel",
        },
      },
    },
  },
  "500": {
    description: "Server error",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/ErrorModel",
        },
      },
    },
  },
};

export const openApiSpec = {
  openapi: "3.0.3",
  info: {
    title: "Space Station API",
    version: "1.0.0",
    description:
      "Public REST API for space station, resources, and supplies.",
  },
  servers: [
    {
      url: "/",
    },
  ],
  paths: {
    "/health": {
      get: {
        operationId: "getHealth",
        summary: "Health check",
        responses: {
          "200": {
            description: "Service is healthy",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/HealthResponse",
                },
              },
            },
          },
          ...errorResponses,
        },
      },
    },
    "/station": {
      get: {
        operationId: "getStation",
        summary: "Get space station payload",
        responses: {
          "200": {
            description: "Space station, resources, and supplies",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/StationPayload",
                },
              },
            },
          },
          ...errorResponses,
        },
      },
    },
  },
  components: {
    schemas: {
      SpaceStation: {
        type: "object",
        required: ["name", "projectStatus", "shieldStatus"],
        properties: {
          name: {
            type: "string",
          },
          projectStatus: {
            type: "string",
          },
          shieldStatus: {
            type: "string",
          },
        },
      },
      Resource: {
        type: "object",
        required: ["name", "quantity", "utilization"],
        properties: {
          name: {
            type: "string",
          },
          quantity: {
            type: "integer",
          },
          utilization: {
            type: "integer",
          },
        },
      },
      Supply: {
        type: "object",
        required: ["name", "quantity", "unitCost"],
        properties: {
          name: {
            type: "string",
          },
          quantity: {
            type: "integer",
          },
          unitCost: {
            type: "number",
          },
        },
      },
      StationPayload: {
        type: "object",
        required: ["spaceStation", "resources", "supplies"],
        properties: {
          spaceStation: {
            $ref: "#/components/schemas/SpaceStation",
          },
          resources: {
            type: "array",
            items: {
              $ref: "#/components/schemas/Resource",
            },
          },
          supplies: {
            type: "array",
            items: {
              $ref: "#/components/schemas/Supply",
            },
          },
        },
      },
      HealthResponse: {
        type: "object",
        required: ["status"],
        properties: {
          status: {
            type: "string",
          },
        },
      },
      ErrorModel: {
        type: "object",
        required: ["errorCode", "errorMessage"],
        properties: {
          errorCode: {
            type: "string",
          },
          errorMessage: {
            type: "string",
          },
        },
      },
    },
  },
};
