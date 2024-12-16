const {Strategy, ExtractJwt } = require('passport-jwt');
const dotenv = require('dotenv');
dotenv.config();

const options ={
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : process.env.JWT_SECRET
}

const JwtStrategy = new Strategy(options, async (payload, done) =>{
    try {
        return done(null, payload);
    } catch (error) {
        return done(error, false);
    }
    
});

module.exports = JwtStrategy;