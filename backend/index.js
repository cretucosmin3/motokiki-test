"use strict";

const API = require("./Api");
const Mongo = require("./mongo.js");

//  ─│┌┐└┘
/*
┌────────── Mongo ──────────────┐
│    User   : motoadmin         │
│  Password : IAqKgPRm5cKHHAPJ  │
└───────────────────────────────┘
Compass : mongodb+srv://motoadmin:IAqKgPRm5cKHHAPJ@cluster0.ilvkw.mongodb.net/test
*/

const uri =
  "mongodb+srv://motoadmin:IAqKgPRm5cKHHAPJ@cluster0.ilvkw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

const sayHello = (r, h) => {
  return "Hello";
};

const unknownRequest = (r, h) => {
  throw "Unknown request!";
};

async function StartProgram() {
  // ! Connect and check connection to Database
  if (!(await Database.connect())) {
    console.log("Database: failed ❌");
    return;
  }

  await API.init(3000, "localhost");
  API.setGet("/hello", sayHello);
  API.setGet("/{any*}", unknownRequest);
  API.start();
}

StartProgram();
