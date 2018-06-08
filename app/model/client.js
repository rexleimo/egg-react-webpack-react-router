'use strict';

module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const conn = app.mongooseDB.get('db1');


    const ClientSchema = new Schema({
        //客户端名称
        name: {
            type: String
        },
        clientId: {
            type: String,
            unique: true
        },
        clientSecret: {
            type: String
        },
        thumb: {
            type: String
        },
        redirectUri: {
            type: String
        },
        refreshTokenLifetime: {
            type: Number,
            default: 1209600
        },
        accessTokenLifetime: {
            type: Number,
            default: 7200
        },
        grants: {
            type: Array
        },
        status: {
            type: Number,
            default: 0
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    });

    return conn.model('Client', ClientSchema);
}