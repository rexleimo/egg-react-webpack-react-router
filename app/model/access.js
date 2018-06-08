'use strict';

module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const conn = app
        .mongooseDB
        .get('db1');

    const RolesSchema = new Schema({
        name: {
            type: String,
            unique: true
        },
        url: {
            type: String
        },
        genra: {
            type: Array
        },
        extra: {
            type: mongoose.Schema.Types.Mixed
        },
        createdAt: {
            type: Date,
            default: Date.now
        }

    });

    return conn.model('Access', RolesSchema);
}