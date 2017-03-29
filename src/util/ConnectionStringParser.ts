

export class ConnectionStringParser {
    public parseConnectionString(connectionString) {
        // split connection string to key=value pairs
        var result = {};
        connectionString.split(';').forEach(function (x) {
            var arr = x.split('=');
            arr[1] && (result[arr[0]] = arr[1]);
        });

        // extract host and port from 'Data Source'
        var host;
        var port;
        var dataSource = result['Data Source'];
        if (dataSource) {
            var match;
            var hostRegex = /.*:(.*),([0-9]+)/;
            if (match = hostRegex.exec(dataSource)) {
                host = match[1];
                port = match[2];
            }
        }

        // extract user from 'User Id' 
        var user;
        var userId = result['User Id'];
        if (userId) {
            var match;
            var hostRegex = /(.*)@.*/;
            if (match = hostRegex.exec(userId)) {
                user = match[1];
            }
        }

        return {
            host: host,
            user: user,
            password: result['Password'],
            options: {
                port: 1433,
                database: result['Initial Catalog'],
                encrypt: true,
            },
        };
    }
}

export default ConnectionStringParser;
