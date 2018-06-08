'use strict';

module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const conn = app
        .mongooseDB
        .get('db1');

    const NewsSchema = new Schema({
        title: {
            type: String
        },
        author: {
            type: String
        },
        thumb: {
            type: String
        },
        digest: {
            type: String
        },
        content: {
            type: String
        },
        content_source_url: {
            type: String
        },
        tags: {
            type: String
        },
        created_at: {
            type: Date,
            default: Date.now
        }
    });

    return conn.model('News', NewsSchema);
};