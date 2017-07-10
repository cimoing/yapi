'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _yapi = require('../yapi.js');

var _yapi2 = _interopRequireDefault(_yapi);

var _mongooseAutoIncrement = require('mongoose-auto-increment');

var _mongooseAutoIncrement2 = _interopRequireDefault(_mongooseAutoIncrement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function model(model, schema) {
    if (schema instanceof _mongoose2.default.Schema === false) {
        schema = new _mongoose2.default.Schema(schema);
    }

    schema.set('autoIndex', false);
    return _yapi2.default.connect.model(model, schema, model);
}

function connect() {
    _mongoose2.default.Promise = global.Promise;
    var config = _yapi2.default.WEBCONFIG;

    var db = _mongoose2.default.connect('mongodb://' + config.db.servername + ':' + config.db.port + '/' + config.db.DATABASE);

    db.then(function (res) {
        _yapi2.default.commons.log('mongodb load success...');
    }, function (err) {
        _yapi2.default.commons.log(err, 'Mongo connect error');
    });

    _mongooseAutoIncrement2.default.initialize(db);

    checkDatabase();
    return db;
}

function checkDatabase() {
    var exist = _yapi2.default.commons.fileExist(_yapi2.default.path.join(_yapi2.default.WEBROOT_RUNTIME, 'init.lock'));
    if (!exist) {
        _yapi2.default.commons.log('lock is not exist');
    }
}

_yapi2.default.db = model;

module.exports = {
    model: model,
    connect: connect
};