const mongo = require("mongodb");
const DbConnection = require("./DbConnection");

module.exports = class Functions {
  static collection(name) {
    var database = DbConnection.client.db("moto");
    return database.collection(name);
  }

  static async insertOne(doc, col) {
    const collection = this.collection(col);

    const result = await collection.insertOne(doc);
    return result.insertedCount === 1;
  }
  static async findById(id, col) {
    var o_id = new mongo.ObjectID(id);
    const collection = this.collection(col);

    const query = collection.find({ _id: o_id });

    var result = [];

    await query.forEach((t) => result.push(t));
    return result;
  }

  static async getDocs(col) {
    const collection = this.collection(col);
    const query = collection.find({});
    var result = [];

    await query.forEach((t) => result.push(t));
    return result;
  }
};
