"use strict";

/*
┌────────── Mongo ──────────────┐
│    User   : motoadmin         │
│  Password : IAqKgPRm5cKHHAPJ  │
└───────────────────────────────┘
Compass Desktop : mongodb+srv://motoadmin:IAqKgPRm5cKHHAPJ@cluster0.ilvkw.mongodb.net/test
*/

const API = require("./Api");
const DbConnection = require("./DbConnection");
const ApiMethods = require("./ApiMethods");

const MongoConnectionString =
  "mongodb+srv://motoadmin:IAqKgPRm5cKHHAPJ@cluster0.ilvkw.mongodb.net/moto?retryWrites=true&w=majority";

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

async function PrepareProgram() {
  DbConnection.init(MongoConnectionString);
  await API.init(2995, "localhost");
  await DbConnection.connect();
}

async function StartProgram() {
  try {
    await PrepareProgram();
  } catch (err) {
    console.log(`Error preparing API: ${err}`);
    return;
  }

  API.setGet("/tyres", ApiMethods.GetTyres);
  API.setGet("/brands", ApiMethods.GetBrands);
  API.setPost("/addtyre", ApiMethods.AddTyre);
  API.setPost("/addbrand", ApiMethods.AddBrand);
  API.start();
}

StartProgram();
