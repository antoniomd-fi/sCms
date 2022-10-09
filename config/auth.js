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
            return res.status(401).json({
                error:  "Not logged in"
            });
        }
        next();
    }, 
    isAdmin: function (req, res, next){
        if(!req.auth){
            return res.status(401).json({
                error: "Not logged in"
            });
        }
        if (req.auth.admin!= true){
            return res.status(403).json({
                error: "You must be logged with an admin account"
            });
        }
        next();
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