"use strict";

const Hapi = require("@hapi/hapi");

class WebApi {
  static #started = false;
  static #server;
  static #routes = [];

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
      routes: {
        cors: true,
      },
    });
  };

  static #initRoute = (route) => {
    this.#server.route({
      method: route.type,
      path: route.path,
      options: {
        handler: async (request, h) => {
          try {
            let receivedData =
              route.type == "GET" ? request.query : request.payload;
            let returnedData = await route.method(receivedData);

            return {
              error: false,
              data: returnedData,
            };
          } catch (error) {
            console.log(error);
            return {
              error: true,
              message: error,
            };
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
