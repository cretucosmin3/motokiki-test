"use strict";

const Hapi = require("@hapi/hapi");
const HapiCookie = require("@hapi/cookie");

class WebApi {
  static #started = false;
  static #server;
  static #routes = [];
  static #users = [
    {
      id: 2,
      name: "admin",
      password: "admin",
    },
  ];

  // Register a get route
  static setGet = (path, method) => {
    this.#routes.push({
      path: path,
      method: method,
      type: "GET",
    });
  };

  // Register a post route
  static setPost = (path, method) => {
    this.#routes.push({
      path: path,
      method: method,
      type: "POST",
    });
  };

  static init = async (port, host) => {
    this.#server = Hapi.server({
      port: port,
      host: host,
    });
  };

  static #initRoute = (route) => {
    this.#server.route({
      method: route.type,
      path: route.path,
      options: {
        auth: {
          mode: "try",
        },
        handler: (request, h) => {
          try {
            if (!request.auth.isAuthenticated) {
              throw "Not authenticated!";
            }

            //if (!route.path.startsWith(this.#authPath))
            //  this.#checkAuth(request.state.data);

            return {
              error: false,
              data: route.method(request, h),
            };
          } catch (error) {
            return { error: true, message: error };
          }
        },
      },
    });
  };

  static start = () => {
    if (this.#started) {
      console.log(`Server is already started on ${this.#server.info.uri}`);
      return;
    }

    // Initialize routes
    this.#routes.forEach((r) => {
      this.#initRoute(r);
    });

    this.#server.start();

    this.#started = true;
    console.log("Server running on %s", this.#server.info.uri);
  };
}

module.exports = WebApi;
