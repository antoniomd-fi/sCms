const secret = require('./secret');
const { expressjwt } = require('express-jwt');

function getTokenFromHeader (req){
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] == 'Bearer') {
        return req.headers.authorization.split(' ')[1]
    }
}

const auth = {
    required: function (req, res, next){
        if (!req.auth || !req.auth.user){
            return res.sendStatus(401);
        }
        next();
    }, 
    isAdmin: function (req, res, next){
        if(!req.auth){
            return res.sendStatus(401);
        }
        if (req.auth.admin!= true){
            return res.sendStatus(403);
        }

    }   ,
    /*expressjwt({
        secret: secret,
        algorithms: ['HS256'],
        userProperty: 'user',
        getToken: getTokenFromHeader
    }),*/
    optional: expressjwt ({
        secret: secret,
        algorithms: ['HS256'],
        userProperty: 'user',
        credentialsRequired: false,
        getToken: getTokenFromHeader
    })
}

module.exports = auth;