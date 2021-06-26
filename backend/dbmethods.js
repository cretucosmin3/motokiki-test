const mongo = require("mongodb");

module.exports = class Functions {
  collection(name) {
    var database = this.client.db("aptlogs");
    return database.collection(name);
  }

  async insertOne(doc, col) {
    const collection = this.collection(col);

    const result = await collection.insertOne(doc);
    return result.insertedCount === 1;
  }

  async insertMany(doc, col) {
    const collection = this.collection(col);

    const result = await collection.insertMany(doc);
    return result.insertedCount > 0;
  }

  async insertOneV2(doc, col, err, success) {
    const collection = this.collection(col);

    await collection.insertOne(doc, (err, result) => {
      if (err) error(err);
      else success(result.insertedId);
    });
  }

  async findById(id, col) {
    var o_id = new mongo.ObjectID(id);
    const collection = this.collection(col);

    const query = collection.find({ _id: o_id });

    var result = [];

    await query.forEach((t) => result.push(t));
    return result;
  }

  async findByCustom(custom, col) {
    const collection = this.collection(col);

    const query = collection.find(custom);

    var result = [];

    await query.forEach((t) => result.push(t));
    return result;
  }

  async getDocs(col) {
    const collection = this.collection(col);
    const query = collection.find({});
    var result = [];

    await query.forEach((t) => result.push(t));
    return result;
  }

  async pushInArray(query, arrayName, newValue, collectionName) {
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

  async pullFromArray(query, arrayName, toRemove, collectionName) {
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

  async updateById(col, id, newdata) {
    const collection = this.collection(col);

    let userId = new mongo.ObjectID(id);
    delete newdata._id;

    var obj = { $set: newdata };
    let res = await collection.updateOne({ _id: userId }, obj);

    return res.result.nModified == 1;
  }

  async updateByCustom(col, custom, newdata, options = null) {
    const collection = this.collection(col);

    var obj = { $set: newdata };
    let res = await collection.updateOne(custom, obj, options);

    return res.result.nModified == 1;
  }
};
