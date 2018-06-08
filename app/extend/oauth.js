// {app_root}/app/extend/oauth.js
'use strict';

const path = require('path');
const nconf = require('nconf');

// need implement some follow functions
module.exports = app => {

    nconf.use('file', {
        file: path.join(app.config.baseDir, 'app/mock/oauth.json')
    });

    class Model {
        constructor(ctx) {
            this.ctx = ctx
        }

        async getClient(clientId, clientSecret) {
            let client = await this.ctx.model.Client.findOne({
                clientId: clientId,
                clientSecret: clientSecret
            });
            //不存在客户端
            if (!client) {
                return false;
            }

            //校验不通过
            if (clientId != client.clientId || clientSecret != client.clientSecret) {
                return false;
            }
            return client;
        }
        async getUser(username, password) {

            let user = await this.ctx.model.Users.findOne({
                email: username
            });

            if (!user) {
                return;
            }

            //let user = nconf.get('user');
            let checked = await this.ctx.compare(password, user.password);

            if (username !== user.email || !checked) {
                return;
            }

            return user;
        }
        /**
         * 获取AccessToken
         */
        async getAccessToken(bearerToken) {

            const accessToken = await this.ctx.model.AccessToken.findOne({
                accessToken: bearerToken
            });

            if (!accessToken) return;

            let user = nconf.get('user');

            return {
                accessToken: accessToken.accessToken,
                accessTokenExpiresAt: accessToken.accessTokenExpiresAt,
                scope: accessToken.scope,
                client: {
                    id: accessToken.clientId
                },
                user: {
                    id: accessToken.userId
                }
            }

            return accessToken;
        }
        async saveToken(token, client, user) {
            try {
                await this.ctx.model.AccessToken.create({
                    accessToken: token.accessToken,
                    accessTokenExpiresAt: token.accessTokenExpiresAt,
                    refreshToken: token.refreshToken,
                    refreshTokenExpiresAt: token.refreshTokenExpiresAt,
                    clientId: client._id,
                    userId: user.id,
                    scope: token.scope || ''
                });

                return {
                    accessToken: token.accessToken,
                    accessTokenExpiresAt: token.accessTokenExpiresAt,
                    refreshToken: token.refreshToken,
                    refreshTokenExpiresAt: token.refreshTokenExpiresAt,
                    client: { id: client._id },
                    user: {
                        username: user.username,
                        email: user.email,
                    }
                }
            } catch (err) {
                return false;
            }
        }
        
        async revokeToken(token) {
            return await app.model.AccessToken.remove({ refreshToken: token.refreshToken })
        }

        async getAuthorizationCode(authorizationCode) {
            console.log(authorizationCode);
        }

        async saveAuthorizationCode(code, client, user) {
            const coderes = {
                authorizationCode: code.authorizationCode,
                expiresAt: code.expiresAt,
                redirectUri: code.redirectUri,
                scope: 'fdfdfd',
                client: { id: client.id },
                user: { id: 1234 }
            };

            return coderes;
        }

        async revokeAuthorizationCode(code) { }
    }
    return Model;
};