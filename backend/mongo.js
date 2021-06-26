const { MongoClient } = require("mongodb");

const connectionString =
  "mongodb://demoUser:DemoLicenta2021@demo.aptsolutions.ro:27017";

module.exports = class Mongo {
  static #_client;
  static #connected = false;

  get client() {
    if (!this.#_client) throw "Mongo client hasn't been initialized!";
    if (!this.#connected) throw "Client needs to be connected!";
    return this.#_client;
  }

  static Init = (conString) => {
    this.#_client = new MongoClient(conString, {
      useUnifiedTopology: true,
    });
  };

  async connect() {
    console.log("\x1b[36m%s\x1b[0m", "Connecting with mongo..");
    try {
      await this.client.connect();
      console.log("\x1b[32m", "connected");
    } catch (err) {
      console.log("\x1b[31m", "error : ", err);
    }

    console.log("\x1b[0m");
    return this.client.isConnected();
  }

  get isConnected() {
    return this.client.isConnected();
  }
};
