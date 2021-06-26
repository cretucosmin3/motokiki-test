const { MongoClient } = require("mongodb");

module.exports = class DbConnection {
  static #_client;
  static #connected = false;

  static get client() {
    if (this.#_client == undefined) throw "Mongo client hasn't been initialized!";
    if (!this.#connected) throw "Client needs to be connected!";
    return this.#_client;
  }

  static init = (conString) => {
    this.#_client = new MongoClient(conString, {
      useUnifiedTopology: true,
    });

    console.log("Mongo client initialized");
  };

  static async connect() {
    try {
      await this.#_client.connect();
      this.#connected = true;
      console.log("Mongo connection started");
    } catch (err) {
      throw err;
    }
  }

  static get isConnected() {
    return this.#_client.isConnected();
  }
};
