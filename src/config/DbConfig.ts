import * as Bookshelf from 'bookshelf';
import * as Knex from 'knex';
import * as connectionStringParser from 'mssql-connection-string';

export class DbConfig {
    public static knex: Knex = Knex({
        client: 'mssql',
        connection: connectionStringParser(process.env.SQLAZURECONNSTR_defaultConnection),
    });

    public static bookshelf: Bookshelf = Bookshelf(DbConfig.knex);

    public static destroy() {
        return DbConfig.knex.destroy();
    }
}

export default DbConfig;
