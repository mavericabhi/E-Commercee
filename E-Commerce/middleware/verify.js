const jwt = require('jsonwebtoken');

let salt = 'mysalt';

const verify = async (req, res, next) => {
    let token = req.headers['authorization'];
    token = token.split(' ')[1];
    let data;
    try {
        data = jwt.verify(token, salt);
    }catch (error) {
        return res.status(401).send({ data: null, error: "Invalid Token" });
    }
    req.encryptedPasswor=data.encryptedPassword;
    next();
};

module.exports = verify;
