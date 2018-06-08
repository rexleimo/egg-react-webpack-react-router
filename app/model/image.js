'use strict';

module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const conn = app
        .mongooseDB
        .get('db1');

    const ImageSchema = new Schema({
        media_id: {
            type: String
        },
        name: {
            type: String
        },
        update_time: {
            type: Date,
            default: Date.now
        },
        url: {
            type: String
        },
        type:{
            type:String,
            //image , video , voice
        },
        is_wechat: {
            type: Number,
            default: 0
        }
    });

    return conn.model('Image', ImageSchema);
};