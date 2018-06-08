import axios from './config';

export default class UserService {
    static constructor() { }

    static async adminCreate(playlod) {
        return axios.post('/api/admin/user/create', playlod);
    }

    static async adminList() {
        return axios.post('/api/admin/user/list');
    }
}