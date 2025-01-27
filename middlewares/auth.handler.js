const boom = require('@hapi/boom');

/*const db = {
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
    class AuthHandler {
    checkAdminRole(req, res, next) {
        const user = req.user;
        if (user.role === 'Administrador') {
            next();
        } else {
            next(boom.unauthorized());
        }
    }
}

module.exports = new AuthHandler();


function checkAdminRole(req,res,next){
    const user = req.user;
    if(user.role ==='Administrador'){
        next();
    }else{
        next(boom.unauthorized());
    }
}*/

function checkRoles(...roles){
    return (req, res, next) =>{
        const user = req.user;
        console.log(user.role);
        console.log(roles);
        console.log(roles.includes(user.role));
        if(roles.includes(user.role)){
            next();
        }else{
            next(boom.unauthorized());
        }
    }
}

module.exports = {checkRoles};

