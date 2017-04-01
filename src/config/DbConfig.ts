import * as Bookshelf from 'bookshelf';
import * as Knex from 'knex';
import parseConnectionString from '../util/parseConnectionString';

export class DbConfig {
    public static knex: Knex = Knex({
        client: 'mssql',
        connection: parseConnectionString(process.env.SQLAZURECONNSTR_defaultConnection),
    });

    public static bookshelf: Bookshelf = Bookshelf(DbConfig.knex);

    public static destroy() {
        return DbConfig.knex.destroy();
    }
}

export default DbConfig;
