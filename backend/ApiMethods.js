const DbConnection = require("./DbConnection");
const DbMethods = require("./DbMethods");

const ApiMethods = {
    GetTyres: async (query) => {
        var tyres = [];

        if (query.page && query.limit) {
            let data = await DbMethods.getDocs("tyres");
            let limit = parseInt(query.limit, 10);
            let page = parseInt(query.page, 10) - 1;

            let start = page >= 1 ? limit * page : 0;
            let end = start + limit;

            console.log(`${start} - ${end}`);
            tyres = data.slice(start, end);
        }
        else {
            tyres = await DbMethods.getDocs("tyres");
        }

        return tyres;
    },
    GetBrands: () => DbMethods.getDocs("brands"),
};

module.exports = ApiMethods;