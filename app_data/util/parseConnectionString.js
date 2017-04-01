"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function parseConnectionString(connectionString) {
    // split connection string to key=value pairs
    const result = {};
    connectionString.split(';').forEach((x) => {
        const arr = x.split('=');
        if (arr[1]) {
            result[arr[0]] = arr[1];
        }
    });
    // extract host and port from 'Data Source'
    let host;
    let port;
    const dataSource = result['Data Source'];
    if (dataSource) {
        let match;
        const regex = /.*:(.*),([0-9]+)/;
        match = regex.exec(dataSource);
        if (match) {
            host = match[1];
            port = match[2];
        }
    }
    // extract user from 'User Id'
    let user;
    const userId = result['User Id'];
    if (userId) {
        let match;
        const regex = /(.*)@.*/;
        match = regex.exec(userId);
        if (match) {
            user = match[1];
        }
    }
    return {
        host,
        options: {
            database: result['Initial Catalog'],
            encrypt: true,
            port: 1433,
        },
        /* tslint:disable */
        password: result['Password'],
        /* tslint:enable */
        user,
    };
}
exports.parseConnectionString = parseConnectionString;
exports.default = parseConnectionString;
