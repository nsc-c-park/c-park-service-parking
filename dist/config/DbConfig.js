"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Knex = require("knex");
const Bookshelf = require("bookshelf");
const ConnectionStringParser_1 = require("../util/ConnectionStringParser");
var connectionStringParser = new ConnectionStringParser_1.default();
class DbConfig {
    static bookshelf() {
        DbConfig._bookshelf.plugin('registry');
        return DbConfig._bookshelf;
    }
}
DbConfig._knex = Knex({
    client: 'mssql',
    connection: connectionStringParser.parseConnectionString(process.env.SQLAZURECONNSTR_defaultConnection),
});
DbConfig._bookshelf = Bookshelf(DbConfig._knex);
exports.DbConfig = DbConfig;
exports.default = DbConfig;
