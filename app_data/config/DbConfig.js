"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Knex = require("knex");
const Bookshelf = require("bookshelf");
const parseConnectionString_1 = require("../util/parseConnectionString");
class DbConfig {
    static bookshelf() {
        DbConfig._bookshelf.plugin('registry');
        return DbConfig._bookshelf;
    }
    static destroy() {
        return DbConfig._knex.destroy();
    }
}
DbConfig._knex = Knex({
    client: 'mssql',
    connection: parseConnectionString_1.default(process.env.SQLAZURECONNSTR_defaultConnection),
});
DbConfig._bookshelf = Bookshelf(DbConfig._knex);
exports.DbConfig = DbConfig;
exports.default = DbConfig;
