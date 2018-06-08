import axios from './config';

export default class AuthService {
    static constructor() { }

    static async login(post) {
        try {
            const res = await axios.post('/oauth2/login', post);
            return res && res.data;
        }
        catch (err) {
            throw new Error(err);
        }
    }

    static async logout() {
        try {
            const result = await axios.post('/oauth2/logout');
            return result && result.data;
        }
        catch (err) {
            throw new Error(err);
        }
    }

}