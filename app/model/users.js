module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const conn = app.mongooseDB.get('db1');

    const UserSchema = new Schema({
        email: {
            type: String,
            unique: true,
        },
        username: {
            type: String,
            unique: true
        },
        password: {
            type: String
        },
        aover: {
            //头像
            type: String
        },
        birthday: {
            type: String
        },
        createAt: {
            type: Date,
            default: Date.now
        }
    });

    return conn.model('Users', UserSchema);
}