const express = require('express');
const passport = require('passport');
const UserService = require('./../services/users.service');
const AuthService = require('./../services/auth.service');

const router = express.Router();
const userService = new UserService();
const authService = new AuthService();

router.post('/login',
    passport.authenticate('local',{session : false}),
    async (req, res, next) =>{
        try {
            const user = req.user;
            console.log('roouter')
            const role = await userService.getRole(user.idUser);
            console.log(authService.signToken(user,role));
            res.json(await authService.signToken(user,role));
        } catch (error) {
            next(error);
        }
});

router.post('/recovery',
    async(req, res ,next) =>{
        try {
            const {email} = req.body;
            const rta = await authService.sendRecovery(email);
            res.json(rta);
        } catch (error) {
            next(error)
        }
    }
)

router.post('/change-password',
    //agrega schema de validacion de token y nueva contraseña
    async(req, res, next)=>{
        try {
            const {token, password} = req.body;
            const rta = await authService.changePassword(token,password);
            console.log(rta);
            return rta;
        } catch (error) {
            next(error);
        }
    }
)

module.exports = router;