'use strict';

module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const conn = app
        .mongooseDB
        .get('db1');

    const TagsSchema = new Schema({
        name: {
            type: String
        },
        type: {
            type: String
        },
        newNumber: {
            type: Number
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    });

    return conn.model('Tags', TagsSchema);
};