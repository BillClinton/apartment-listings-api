define({ "api": [
  {
    "type": "post",
    "url": "/apartments",
    "title": "Create Apartment",
    "name": "CreateApartment",
    "group": "Apartment",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "JSON",
            "optional": false,
            "field": "body",
            "description": "<p>Apartment object.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "    {\n\t    \"name\":\"3 bedroom in Fairmount\",\n\t    \"address\": \"2009 Green St., Philadelphia Pa, 19130\",\n\t    \"rent\": 1850,\n\t    \"bedrooms\": 3,\n\t    \"bathrooms\": 1.5,\n\t    \"contact\": \"215-123-4567\",\n\t    \"available\": \"December\"\n    }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>User profile information</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n    {\n\t     \"name\":\"3 bedroom in Fairmount\",\n\t     \"address\": \"2009 Green St., Philadelphia Pa, 19130\",\n\t     \"rent\": 1850,\n\t     \"bedrooms\": 3,\n\t     \"bathrooms\": 1.5,\n\t     \"contact\": \"215-123-4567\",\n\t     \"available\": \"December\"\n    }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Bad Request</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routers/apartment.js",
    "groupTitle": "Apartment"
  },
  {
    "type": "delete",
    "url": "/apartments/:id",
    "title": "Delete Apartment",
    "name": "DeleteApartment",
    "group": "Apartment",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Apartments unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "apartment",
            "description": "<p>Apartment information</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   \"_id\": \"5d8fcfac47867a038e8f87fe\",\n   \"name\":\"Large Rehabbed 3 Bedroom House in Northern Liberties\",\n   \"address\": \"944 N American St, Philadelphia Pa, 19130\",\n   \"rent\": 2300,\n   \"bedrooms\": 3,\n   \"bathrooms\": 2,\n   \"contact\": \"267-123-4567\",\n   \"available\": \"December\",\n   \"createdAt\": \"2019-09-28T21:25:00.695Z\",\n   \"updatedAt\": \"2019-09-28T21:45:00.695Z\",\n   \"__v\": 0\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Bad Request</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Not Found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"Bad Request.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routers/apartment.js",
    "groupTitle": "Apartment"
  },
  {
    "type": "get",
    "url": "/apartments",
    "title": "Read All Apartments",
    "name": "GetApartments",
    "group": "Apartment",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "apartments",
            "description": "<p>An Array of apartment objects</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[{\n \"_id\": \"5d8c2b339740dd02df0ed8c0\",\n \"name\":\"3 bedroom in Fairmount\",\n \"address\": \"2009 Green St., Philadelphia Pa, 19130\",\n \"rent\": 1850,\n \"bedrooms\": 3,\n \"bathrooms\": 1.5,\n \"contact\": \"215-123-4567\",\n \"available\": \"December\",\n \"createdAt\": \"2019-09-26T03:06:27.712Z\",\n \"updatedAt\": \"2019-09-26T03:06:27.712Z\",\n \"__v\": 0\n},{\n \"_id\": \"5d8fcfac47867a038e8f87fe\",\n \"name\":\"Large Rehabbed 3 Bedroom House in Northern Liberties\",\n \"address\": \"944 N American St, Philadelphia Pa, 19130\",\n \"rent\": 2350,\n \"bedrooms\": 3,\n \"bathrooms\": 2,\n \"contact\": \"267-123-4567\",\n \"available\": \"November 15\",\n \"createdAt\": \"2019-09-28T21:25:00.695Z\",\n \"updatedAt\": \"2019-09-28T21:25:00.695Z\",\n \"__v\": 0\n}]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 5xx": [
          {
            "group": "Error 5xx",
            "optional": false,
            "field": "500",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"error\": \"Error Message\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routers/apartment.js",
    "groupTitle": "Apartment"
  },
  {
    "type": "get",
    "url": "/apartment/:id",
    "title": "Read Apartment",
    "name": "ReadApartment",
    "group": "Apartment",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Apartment's unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "apartment",
            "description": "<p>Apartment information</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   \"_id\": \"5d8fcfac47867a038e8f87fe\",\n   \"name\":\"Large Rehabbed 3 Bedroom House in Northern Liberties\",\n   \"address\": \"944 N American St, Philadelphia Pa, 19130\",\n   \"rent\": 2350,\n   \"bedrooms\": 3,\n   \"bathrooms\": 2,\n   \"contact\": \"267-123-4567\",\n   \"available\": \"November 15\",\n   \"createdAt\": \"2019-09-28T21:25:00.695Z\",\n   \"updatedAt\": \"2019-09-28T21:25:00.695Z\",\n   \"__v\": 0\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Not Found</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routers/apartment.js",
    "groupTitle": "Apartment"
  },
  {
    "type": "patch",
    "url": "/apartments/:id",
    "title": "Update Apartment",
    "name": "UpdateApartment",
    "group": "Apartment",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Apartments unique ID.</p>"
          },
          {
            "group": "Parameter",
            "type": "JSON",
            "optional": false,
            "field": "body",
            "description": "<p>Updates to be applied to apartment.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n   \"rent\": 2300,\n   \"available\": \"December\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "apartment",
            "description": "<p>Apartment profile information</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   \"_id\": \"5d8fcfac47867a038e8f87fe\",\n   \"name\":\"Large Rehabbed 3 Bedroom House in Northern Liberties\",\n   \"address\": \"944 N American St, Philadelphia Pa, 19130\",\n   \"rent\": 2300,\n   \"bedrooms\": 3,\n   \"bathrooms\": 2,\n   \"contact\": \"267-123-4567\",\n   \"available\": \"December\",\n   \"createdAt\": \"2019-09-28T21:25:00.695Z\",\n   \"updatedAt\": \"2019-09-28T21:45:00.695Z\",\n   \"__v\": 0\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Invalid Updates Attempted</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Not Found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"Invalid updates attempted.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routers/apartment.js",
    "groupTitle": "Apartment"
  },
  {
    "type": "post",
    "url": "/users",
    "title": "Create User",
    "name": "CreateUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "JSON",
            "optional": false,
            "field": "body",
            "description": "<p>User object.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"name\": \"Nick\",\n  \"surname\": \"Foles\",\n  \"email\": \"nfoles9@gmail.com\",\n  \"password\": \"eagles4133\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>User profile information</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"name\": \"Nick\",\n  \"surname\": \"Foles\",\n  \"email\": \"nfoles9@gmail.com\",\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Bad Request</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routers/user.js",
    "groupTitle": "User"
  },
  {
    "type": "delete",
    "url": "/users/:id",
    "title": "Delete User",
    "name": "DeleteUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Users unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>User profile information</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"name\": \"John\",\n  \"surname\": \"Doe\",\n  \"email\": \"johndoe@email.com\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Bad Request</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"Bad Request.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routers/user.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/user/me",
    "title": "Request Current User",
    "name": "GetProfile",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>User profile information</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"name\": \"John\",\n  \"surname\": \"Doe\",\n  \"email\": \"johndoe@email.com\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 5xx": [
          {
            "group": "Error 5xx",
            "optional": false,
            "field": "500",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"error\": \"Error Message\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routers/user.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/users",
    "title": "Request All Users",
    "name": "GetUsers",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "users",
            "description": "<p>An Array of user objects</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[{\n  \"name\": \"John\",\n  \"surname\": \"Doe\",\n  \"email\": \"johndoe@email.com\"\n},{\n  \"name\": \"Elizabeth\",\n  \"surname\": \"Doe\",\n  \"email\": \"edoe@email.com\"\n}]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 5xx": [
          {
            "group": "Error 5xx",
            "optional": false,
            "field": "500",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"error\": \"Error Message\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routers/user.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/users/login",
    "title": "Login",
    "name": "LoginUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "JSON",
            "optional": false,
            "field": "body",
            "description": "<p>Email and password combination.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"email\": \"nfoles9@gmail.com\",\n  \"password\": \"eagles4133\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>User profile information</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"name\": \"Nick\",\n  \"surname\": \"Foles\",\n  \"email\": \"nfoles9@gmail.com\",\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Bad Request</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routers/user.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/users/logoutAll",
    "title": "Logout All Sessions",
    "name": "LogoutAllUserSessions",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "200",
            "description": "<p>OK</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "error 4xx": [
          {
            "group": "error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Bad Request</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routers/user.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/users/logout",
    "title": "Logout",
    "name": "LogoutUser",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "200",
            "description": "<p>OK</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "error 4xx": [
          {
            "group": "error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Bad Request</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routers/user.js",
    "groupTitle": "User"
  },
  {
    "type": "patch",
    "url": "/users/:id",
    "title": "Update User",
    "name": "UpdateUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Users unique ID.</p>"
          },
          {
            "group": "Parameter",
            "type": "JSON",
            "optional": false,
            "field": "body",
            "description": "<p>Updates to be applied to user.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"name\": \"Marco\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>User profile information</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"name\": \"John\",\n  \"surname\": \"Doe\",\n  \"email\": \"johndoe@email.com\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Invalid Updates Attempted</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"Invalid updates attempted.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routers/user.js",
    "groupTitle": "User"
  }
] });
