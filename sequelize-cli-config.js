require('ts-node').register();
module.exports = {
    development: {
        dialect: 'mysql',
        host: '127.0.0.1',
        username: 'root',
        password: 'password',
        database: 'portfolio',
        models: [__dirname + '/src/models/*.ts'],
        dialectOptions: {
            useUTC: false,
        },
        logging: console.log,
    },
};
