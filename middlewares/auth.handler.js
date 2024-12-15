const boom = require('@hapi/boom');

const db = {
    apiKey : process.env.API_KEY
} 

function checkApiKey(req,res,next){
    const apiKey = req.headers['api'];
    if(apiKey === db.apiKey){
        next();
    } else{
        next(boom.unauthorized());
    }
}

module.exports = {checkApiKey};