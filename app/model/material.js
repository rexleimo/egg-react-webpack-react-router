'use strict';

module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const conn = app
        .mongooseDB
        .get('db1');

    const MaterialSchema = new Schema({
        media_id: {
            type: String
        },
        news_item: {
            type: Array
        },
        create_time: {
            type: Date,
            default: Date.now
        },
        update_time: {
            type: Date,
            default: Date.now
        },
        is_wechat: {
            type: Number,
            default: 0
        }
    });

    return conn.model('Material', MaterialSchema);
};