const Service = require('egg').Service;

module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const conn = app
        .mongooseDB
        .get('db1');

    const RoleSchema = new Schema({
        name: {
            type: String
        },
        access: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Access'
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    });

    return conn.model('Roles', RoleSchema);
}