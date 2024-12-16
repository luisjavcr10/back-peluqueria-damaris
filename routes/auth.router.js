const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken')
const UserService = require('./../services/users.service');
const service = new UserService();
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();

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
            const secret = process.env.JWT_SECRET;
            const token = jwt.sign(payload,secret);
            res.json({
                user,
                token
            });
        } catch (error) {
            next(error);
        }
});

module.exports = router;