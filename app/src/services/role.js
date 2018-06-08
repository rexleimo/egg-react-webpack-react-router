import axios from './config';

export default class RoleService {
    static constructor() {
    }

    static async fetchCreate(playlod) {
        try {
            return await axios.post('/api/role/create', playlod);
        } catch (err) {
            throw new Error(err);
        }
    }

    static async fetchGet(playlod) {
        try {
            return await axios.post('/api/role/index', playlod)
        } catch (err) {
            throw new Error(err);
        }
    }

    static async fetchDestroy(_id) {
        try {
            return await axios.delete(`/api/role/${_id}/destroy`);
        } catch (e) {
            throw new Error(e);
        }
    }

    static async fetchShow(_id) {
        try {
            return await axios.get(`/api/role/${_id}/show`);
        } catch (err) {
            throw new Error(err);
        }
    }

    static async fetchUpdate(_id, playlod) {
        try {
            return await axios.put(`/api/role/${_id}/update`, playlod);
        } catch (e) {
            throw new Error(e);
        }
    }
}













