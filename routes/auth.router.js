const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken')
const config = require('./../config/config');

const router = express.Router();
const UserService = require('./../services/users.service');
const service = new UserService();

router.post('/login',
    passport.authenticate('local',{session : false}),
    async (req, res, next) =>{
        try {
            const user = req.user;
            const role = await service.getRole(user.idUser);
            const payload ={
                sub : user.name,
                role : role
            }
            const secret = config.jwtSecret;
            const options = {
                expiresIn: '6h'
            };
            const token = jwt.sign(payload,secret,options);
            res.json({
                user,
                token
            });
        } catch (error) {
            next(error);
        }
});

module.exports = router;