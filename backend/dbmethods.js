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

  static async insertMany(doc, col) {
    const collection = this.collection(col);

    const result = await collection.insertMany(doc);
    return result.insertedCount > 0;
  }

  static async insertOneV2(doc, col, err, success) {
    const collection = this.collection(col);

    await collection.insertOne(doc, (err, result) => {
      if (err) error(err);
      else success(result.insertedId);
    });
  }

  static async findById(id, col) {
    var o_id = new mongo.ObjectID(id);
    const collection = this.collection(col);

    const query = collection.find({ _id: o_id });

    var result = [];

    await query.forEach((t) => result.push(t));
    return result;
  }

  static async findByCustom(custom, col) {
    const collection = this.collection(col);

    const query = collection.find(custom);

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

  static async pushInArray(query, arrayName, newValue, collectionName) {
    let dataToPush = {};
    dataToPush[arrayName] = newValue;

    const updateDocument = {
      $push: dataToPush,
    };

    const collection = this.collection(collectionName);
    if (!collection) return false;
    const result = await collection.updateOne(query, updateDocument);
    return result.result.nModified == 1;
  }

  static async pullFromArray(query, arrayName, toRemove, collectionName) {
    let dataToPush = {};
    dataToPush[arrayName] = toRemove;

    const updateDocument = {
      $pull: dataToPush,
    };

    const collection = this.collection(collectionName);
    if (!collection) return false;
    const result = await collection.updateOne(query, updateDocument);
    return result.result.nModified == 1;
  }

  static async updateById(col, id, newdata) {
    const collection = this.collection(col);

    let userId = new mongo.ObjectID(id);
    delete newdata._id;

    var obj = { $set: newdata };
    let res = await collection.updateOne({ _id: userId }, obj);

    return res.result.nModified == 1;
  }

  static async updateByCustom(col, custom, newdata, options = null) {
    const collection = this.collection(col);

    var obj = { $set: newdata };
    let res = await collection.updateOne(custom, obj, options);

    return res.result.nModified == 1;
  }
};
