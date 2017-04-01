"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Bookshelf = require("bookshelf");
const Knex = require("knex");
const parseConnectionString_1 = require("../util/parseConnectionString");
class DbConfig {
    static destroy() {
        return DbConfig.knex.destroy();
    }
}
DbConfig.knex = Knex({
    client: 'mssql',
    connection: parseConnectionString_1.default(process.env.SQLAZURECONNSTR_defaultConnection),
});
DbConfig.bookshelf = Bookshelf(DbConfig.knex);
exports.DbConfig = DbConfig;
exports.default = DbConfig;
