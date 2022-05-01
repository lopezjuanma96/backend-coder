const options = {
    client:'mariadb', // remember this needs to have whichever database client is used with npm
    connection: {
        host: '127.0.0.1',
        port: '4306',
        user: 'root',
        password: '', //should not be added in plain code, 
        database: 'productsDB'
    }
}

module.exports = options;