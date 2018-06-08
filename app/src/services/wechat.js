import axios from './config';

export default class WechatService {
    static constructor() {
    }

    /**
     * 获取永久素材列表
     * @param {*} type image(图片) video (视频) voice (语音) news (图文)
     * @param {*} offset 从全部素材的该偏移位置开始返回，0表示从第一个素材 返回
     * @param {*} count 返回素材的数量，取值在1到20之间
     */
    static async getMaterials(type, offset, count) {
        try {
            const res = await axios.post('/wechat/material/get_material', {
                type: type,
                offset: offset,
                count: count
            });
            return res && res.data;
        }
        catch (err) {
            throw new Error(err);
        }
    }

    static async getMaterial(media_id) {
        try {
            const res = await axios.post(`/wechat/material/${media_id}/get`);
            return res && res.data;
        }
        catch (err) {
            throw new Error(err);
        }
    }

    /**
     * 保存永久素材
     */
    static async saveMaterial(playlod) {
        try {
            const result = await axios.post(`/wechat/material/save`, playlod);
            return result && result.data;
        } catch (err) {
            throw new Error(err);
        }
    }

    /**
     */

    static async updateMaterial(_id, playlod) {
        try {
            const reuslt = await axios.put(`/wechat/material/${_id}/save`, playlod);
            return reuslt;
        } catch (e) {
            throw new Error(e);
        }
    }

}