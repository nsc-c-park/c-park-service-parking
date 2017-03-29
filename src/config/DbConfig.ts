import * as Knex from 'knex';
import * as Bookshelf from 'bookshelf';
import ConnectionStringParser from '../util/ConnectionStringParser';

var connectionStringParser = new ConnectionStringParser();

export class DbConfig {
    private static _knex: Knex = Knex({
        client: 'mssql',
        connection: connectionStringParser.parseConnectionString(
            process.env.SQLAZURECONNSTR_defaultConnection),
    });

    private static _bookshelf: Bookshelf = Bookshelf(DbConfig._knex);

    public static bookshelf(): Bookshelf {
        DbConfig._bookshelf.plugin('registry');
        return DbConfig._bookshelf;
    }
}

export default DbConfig
