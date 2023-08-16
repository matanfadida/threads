const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const auth = req.get('Authorization');
    if (!auth){
        const error = new Error("No Authenticated.")
        error.statusCode = 401;
        throw error;
    }
    const token = auth.split(" ")[1];
    let decodedToken;
    try{
        decodedToken = jwt.verify(token, "Sfa14shASFREgGETGE12!@#fdsf#$f@!F");
    }
    catch (err){
        err.statusCode = 401;
        throw err;
    }
    if(!decodedToken){
        const error = new Error("No Current Token.")
        error.statusCode = 401;
        throw error;
    }
    req.userId = decodedToken.userId;
    next();
}