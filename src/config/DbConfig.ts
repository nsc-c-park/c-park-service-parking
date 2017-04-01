import * as Knex from 'knex';
import * as Bookshelf from 'bookshelf';
import parseConnectionString from '../util/parseConnectionString';

export class DbConfig {
    private static _knex: Knex = Knex({
        client: 'mssql',
        connection: parseConnectionString(
            process.env.SQLAZURECONNSTR_defaultConnection),
    });

    private static _bookshelf: Bookshelf = Bookshelf(DbConfig._knex);

    public static bookshelf(): Bookshelf {
        DbConfig._bookshelf.plugin('registry');
        return DbConfig._bookshelf;
    }

    public static destroy() {
        return DbConfig._knex.destroy();
    }
}

export default DbConfig
