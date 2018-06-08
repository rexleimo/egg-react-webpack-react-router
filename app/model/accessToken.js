'use strict';

module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const conn = app.mongooseDB.get('db1');

    const AccessTokenSchema = new Schema({
        accessToken: {
            type: String,
            unique: true
        },
        accessTokenExpiresAt: {
            type: Date
        },
        refreshToken: {
            type: String
        },
        refreshTokenExpiresAt: {
            type: Date
        },
        clientId: {
            type: String
        },
        userId: {
            type: String
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    });

    return conn.model('AccessToken', AccessTokenSchema);
}