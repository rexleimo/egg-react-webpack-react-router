'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const {router, controller} = app;
    //认证
    //app.get('/oauth2', controller.oauth.authorize);
    app.all('/oauth2/token', app.oAuth2Server.token(), 'oauth.token');   // 获取token
    app.all('/oauth2/authorize', app.oAuth2Server.authorize());      // 获取授权码
    app.all('/oauth2/authenticate', app.oAuth2Server.authenticate(), 'oauth.authenticate');    // 验证请求

    router.all('/oauth2/login', controller.oauth.login);
    router.all('/oauth2/logout', app.oAuth2Server.authenticate(), 'oauth.logout');

    //上传图片
    router.post('/upload', controller.upload.index);

    router.post('/api/news/create', controller.admin.news.create);
    router.post('/api/news/list', controller.admin.news.list);
    router.get('/api/news/:id/find', controller.admin.news.find);
    router.put('/api/news/:id/update', controller.admin.news.update);
    router.delete('/api/news/:id/destroy', controller.admin.news.destroy);

    router.post('/api/access/all', controller.admin.access.get);
    router.post('/api/access/find', controller.admin.access.find);
    router.post('/api/access/create', controller.admin.access.create);
    router.post('/api/access/:id/update', controller.admin.access.update);
    router.delete('/api/access/:id/destroy', controller.admin.access.destroy);

    router.post('/api/role/create', controller.admin.role.create);
    router.post('/api/role/index', controller.admin.role.index);
    router.get('/api/role/:id/show', controller.admin.role.show);
    router.delete('/api/role/:id/destroy', controller.admin.role.delete);
    router.put('/api/role/:id/update', controller.admin.role.update);

    router.post('/api/oauth/create', controller.admin.oauth.create);
    router.post('/api/oauth/get', controller.admin.oauth.list);
    router.get('/api/oauth/:id/find', controller.admin.oauth.find);
    router.put('/api/oauth/:id/update', controller.admin.oauth.update);
    router.delete('/api/oauth/:id/delete', controller.admin.oauth.delete);

    router.post('/api/admin/user/create', controller.admin.user.create);
    router.post('/api/admin/user/list', controller.admin.user.list);

    /*-----------------------------------------------------------微信----------------------------------------------------------------------*/
    router.get('/wechat/accessToken/get', controller.wechat.common.accessToken);
    router.post('/wechat/material/get_material', controller.wechat.common.getLocalMaterials);
    router.get('/wechat/material/get/online', controller.wechat.common.getMaterials);
    router.post('/wechat/material/:id/get', controller.wechat.common.findone);
    router.post('/wechat/material/save', controller.wechat.common.saveLocalMaterial);
    router.put('/wechat/material/:id/save', controller.wechat.common.uploadLocalMaterial);

    router.post('/wechat/material/images/upload', controller.wechat.upload.index);

    /*-------------------------------------------------------- 前端路由 -------------------------------------------------------------------*/

    router.get('/', controller.home.main.index);
    router.get('/seach', controller.home.main.index);
    router.get('/p/:id', controller.home.main.post);


};
