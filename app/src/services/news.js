import axios from './config';
import { normalize } from 'path';

export default class NewsService {
    static constructor() { }

    static async fetchNewsCreate(post) {
        try {
            const res = await axios.post('/api/news/create', post);
            return res && res.data;
        }
        catch (err) {
            throw new Error(err);
        }
    }

    static async fetchNewsUpdate(_id, playlod) {
        try {
            const result = await axios.put(`/api/news/${_id}/update`, playlod);
            return result && result.data;
        }
        catch (err) {
            throw new Error(err);
        }
    }

    static async fetchNewsList(playlod) {
        try {
            const result = await axios.post('/api/news/list', playlod);
            return result && result.data;
        }
        catch (err) {
            throw new Error(err);
        }
    }

    static async fetchNewsFindOne(_id) {
        try {
            const result = await axios.get(`/api/news/${_id}/find`);
            return result && result.data;
        } catch (err) {
            throw new Error(err);
        }
    }

    static async fetchRoleDestroy(_id) {
        try {
            const result = await axios.delete(`api/news/${_id}/destroy`);
            return result && result.data;
        } catch (err) {
            throw new Error(err);
        }
    }
}