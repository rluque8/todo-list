export const swaggerJson = {
  "swagger": "2.0",
  "info": {
    "description": "Todo List Project for Ubiq",
    "version": "1.0.0",
    "title": "TODO List",
    "termsOfService": "http://swagger.io/terms/",
    "contact": {
      "name": "Rodrigo Luque",
      "email": "roluquec@gmail.com"
    },
    "license": {
      "name": "Apache 2.0",
      "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
    }
  },
  "host": "virtserver.swaggerhub.com",
  "basePath": "/Rod35/Todo-list-ubiq/1.0.0",
  "schemes": [
    "https",
    "http"
  ],
  "paths": {
    "/users/login": {
      "post": {
        "tags": [
          "User Module"
        ],
        "summary": "Login",
        "description": "API for Login",
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "in": "body",
            "name": "body",
            "description": "Login Payload",
            "required": true,
            "schema": {
              "$ref": "#/definitions/UserLogin"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Login Successfully",
            "schema": {
              "$ref": "#/definitions/ApiResponse"
            }
          },
          "400": {
            "description": "Invalid Fields"
          },
          "500": {
            "description": "Internal Server Error"
          }
        }
      }
    },
    "/users/": {
      "post": {
        "tags": [
          "User Module"
        ],
        "summary": "Signup",
        "description": "API for Signup",
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "in": "body",
            "name": "body",
            "description": "Signup Payload",
            "required": true,
            "schema": {
              "$ref": "#/definitions/User"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Signup Successfully",
            "schema": {
              "$ref": "#/definitions/ApiResponse"
            }
          },
          "400": {
            "description": "Invalid Fields"
          },
          "500": {
            "description": "Internal Server Error"
          }
        }
      }
    },
    "/users/{id}": {
      "delete": {
        "tags": [
          "User Module"
        ],
        "summary": "Remove User",
        "description": "Remove User",
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "User Id",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "204": {
            "description": "User Deleted Successfully"
          },
          "400": {
            "description": "Invalid Fields"
          },
          "500": {
            "description": "Internal Server Error"
          }
        },
        "security": [
          {
            "Bearer": []
          }
        ]
      }
    },
    "/tasks": {
      "get": {
        "tags": [
          "Task Module"
        ],
        "summary": "Get all tasks",
        "description": "API for fetching all tasks",
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "name": "skip",
            "in": "query",
            "description": "No. of record to be skipped for pagination",
            "required": true,
            "type": "number"
          },
          {
            "name": "limit",
            "in": "query",
            "description": "No. of record api should return for pagination",
            "required": true,
            "type": "number"
          }
        ],
        "responses": {
          "200": {
            "description": "Tasks fetched Successfully",
            "schema": {
              "$ref": "#/definitions/ApiResponse"
            }
          },
          "400": {
            "description": "Invalid Fields"
          },
          "500": {
            "description": "Internal Server Error"
          }
        },
        "security": [
          {
            "Bearer": []
          }
        ]
      },
      "post": {
        "tags": [
          "Task Module"
        ],
        "summary": "Create task",
        "description": "API for creating Task",
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "in": "body",
            "name": "body",
            "description": "Create Task Payload",
            "required": true,
            "schema": {
              "$ref": "#/definitions/Task"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Task Created Successfully",
            "schema": {
              "$ref": "#/definitions/ApiResponse"
            }
          },
          "400": {
            "description": "Invalid Fields"
          },
          "500": {
            "description": "Internal Server Error"
          }
        },
        "security": [
          {
            "Bearer": []
          }
        ]
      }
    },
    "/tasks/{id}": {
      "put": {
        "tags": [
          "Task Module"
        ],
        "summary": "Update Task status",
        "description": "Update Task status",
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "Task Id",
            "required": true,
            "type": "string"
          },
          {
            "in": "body",
            "name": "body",
            "description": "Update Task Payload",
            "required": true,
            "schema": {
              "$ref": "#/definitions/TaskUpdateStatus"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Task Updated Successfully",
            "schema": {
              "$ref": "#/definitions/ApiResponse"
            }
          },
          "400": {
            "description": "Invalid Fields"
          },
          "500": {
            "description": "Internal Server Error"
          }
        },
        "security": [
          {
            "Bearer": []
          }
        ]
      }
    }
  },
  "securityDefinitions": {
    "Bearer": {
      "type": "apiKey",
      "name": "Authorization",
      "in": "header"
    }
  },
  "definitions": {
    "User": {
      "properties": {
        "name": {
          "type": "string",
          "description": "Name of the user"
        },
        "email": {
          "type": "string",
          "description": "Email of user"
        },
        "password": {
          "type": "string",
          "description": "Password of the user"
        }
      }
    },
    "UserLogin": {
      "properties": {
        "email": {
          "type": "string",
          "description": "Email of user"
        },
        "password": {
          "type": "string",
          "description": "Password of the user"
        }
      }
    },
    "Task": {
      "properties": {
        "description": {
          "type": "string",
          "description": "Task description"
        },
        "priority": {
          "type": "number",
          "description": "Task priority"
        },
        "status": {
          "type": "string",
          "description": "Task status. Only allows PENDING/DONE/DROPPED"
        }
      }
    },
    "TaskUpdateStatus": {
      "properties": {
        "status": {
          "type": "string",
          "description": "Task status. Only allows PENDING/DONE/DROPPED"
        }
      }
    },
    "ApiResponse": {
      "type": "object",
      "properties": {
        "code": {
          "type": "integer"
        },
        "status": {
          "type": "string"
        },
        "result": {
          "type": "object",
          "properties": {}
        }
      }
    }
  }
}
