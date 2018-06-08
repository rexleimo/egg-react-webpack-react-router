import axios from './config';

import { message } from 'antd';

export default class ClientService {
    static constructor() { }
    /**
     * 添加Client端
     */
    static async fetchCreate(playlod) {
        const result = await axios.post('/api/oauth/create', playlod);
        if (result.code !== 20000) {
            message.error(result.message);
        } else {
            message.success(result.message);
            return result;
        }
    }

    static async fetchGet(playlod) {
        const result = await axios.post('/api/oauth/get', playlod);
        return result;
    }

    static async fetchFind(_id) {
        const result = await axios.get(`/api/oauth/${_id}/find`)
        return result;
    }

    static async fetchDelete(_id) {
        const result = await axios.delete(`/api/oauth/${_id}/delete`);
        return result;
    }

    static async fetchUpdate(_id, playlod) {
        const result = await axios.put(`/api/oauth/${_id}/update`, playlod);
    }
}
