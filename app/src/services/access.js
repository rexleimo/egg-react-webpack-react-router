import axios from './config';
import {message} from 'antd';
export default class AccessService {
    static constructor() {}
    /**
     * 查找所有角色
     */
    static async fetchRoleFindAll() {
        try {
            const result = await axios.post('/api/access/all');
            return result;
        } catch (err) {
            throw new Error(err);
        }
    }
    /**
     * 查看单个角色
     */
    static async fetchRoleFind(id) {
        try {
            const result = await axios.post('/api/access/find', {id: id});
            return result;
        } catch (err) {
            throw new Error(err.message);
        }
    }
    /**
     * 创建一个角色
     * @param {*} post 添加的post元素
     */
    static async fetchRoleCreate(post) {
        try {
            const result = await axios.post('/api/access/create', post);
            return result;
        } catch (err) {
            console.error(err);
        }
    }

    static async fetchRoleUpdate(_id, post) {
        try {
            const result = await axios
                .post(`/api/access/${_id}/update`, post)
                .then((res) => {
                    if (res.code == 20000) {
                        message.success(res.message);
                    } else {
                        message.error(res.message);
                    }
                });
            return result;
        } catch (err) {
            message.error("系统异常，请通知管理员");
        }
    }

    static async fetchRoleDestroy(_id) {
        try {
            const result = await axios
                .delete(`/api/access/${_id}/destroy`)
                .then((res) => {
                    if (res.code == 20000) {
                        message.success(res.message);
                    } else {
                        message.error(res.message);
                    }
                });
        } catch (err) {
            message.error("系统异常，请通知管理员");
        }
    }

}