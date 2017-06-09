/**
 * Created by tingtzechuen on 9/6/17.
 */
let Sequelize = require('sequelize');


// Connection
var environment = process.env.NODE_ENV || 'development';

var db_name = 'eth2cash';
var db_user = 'eth2cash';

var dev_db_password = 'BA457269-C4BE-4A8B-9EBC-6A3918AC8AEE';
var production_db_password = '7A79CB6A-BD4E-4660-BD2C-200B39120726';

var port = 3306;

function host() {
    switch (environment) {
        case 'production':
            return 'live.autonado.com';
        default:
            return 'localhost';
    }
}

function db_password() {
    switch (environment) {
        case 'production':
            return production_db_password;
        default:
            return dev_db_password;
    }
}

sequelize = new Sequelize(db_name, db_user, db_password(), {
    host: host(),
    port: port,
    dialect: 'mysql',
    dialectOptions: { // This is for emoji support
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci'
    }
});

sequelize
    .authenticate()
    .then(function (err) {
        if (!!err) {
            console.log('Unable to connect to the database:', err);
            console.log('Name: ' + db_name);
            console.log('User: ' + db_user);
            console.log('Password: ' + db_password);
            console.log('Host: ' + host);
            console.log('Port: ' + port);
        } else {
            console.log('Connection has been established successfully.')
        }
    });

// Models
let models = [
    'Trade',
    'Trader'
];

models.forEach(function (model) {
    module.exports[model] = sequelize.import(__dirname + '/' + model);
});


// Relationships
(function (m) {


})(module.exports);

module.exports.db = sequelize;
