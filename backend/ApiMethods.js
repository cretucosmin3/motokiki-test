const DbMethods = require("./DbMethods");

async function getTyres(query) {
  var data = await DbMethods.getDocs("tyres");

  if (query && query.page && query.limit) {
    let limit = parseInt(query.limit, 10);
    let page = parseInt(query.page, 10) - 1;

    let start = page >= 1 ? limit * page : 0;
    let end = start + limit;

    data = data.slice(start, end);
  }

  return data;
}

function getBrands() {
  return DbMethods.getDocs("brands");
}

async function addTyre(tyreData) {
  await DbMethods.insertOne(tyreData, "tyres");
  return await getTyres();
}

async function addBrand(brandData) {
  await DbMethods.insertOne(brandData, "brands");
  return await getBrands();
}

const ApiMethods = {
  GetTyres: getTyres,
  GetBrands: getBrands,
  AddTyre: addTyre,
  AddBrand: addBrand,
};

module.exports = ApiMethods;
