const UserService = require('./users.service');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const config = require('./../config/config');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const service = new UserService();

class AuthService {
    async getUser(email, password){
        const user = await service.findByEmail(email);
        if (!user) {
            throw boom.unauthorized();
        }
        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            throw boom.unauthorized();
        }
        return user;
    }

    async signToken(user, role) {
        const payload ={
            sub : user.idUser,
            role : role
        }
        const options = {
            expiresIn: '6h'
        };
        const token = jwt.sign(payload, config.jwtSecret,options);
        return{
            user,
            token
        };
    }

    async sendRecovery(email){
        const user = await service.findByEmail(email);
        console.log(user)
        if (!user) {
            throw boom.unauthorized();
        }
        const payload = {sub: user.idUser};
        const options = {expiresIn: '15min'};
        const token = jwt.sign(payload,config.jwtSecret,options);
        await service.update(user.idUser,{recoveryToken : token})
        const link = `http://myfrontend.com/recovery?token=${token}`;
        const mail ={
            from: config.email, 
            to: `${user.email}`, // list of receivers
            subject: "Recuperación de contraseña", // Subject line
            html: `<b>Ingresa a este enlace => ${link}</b>`, // html body
        };
        const rta = await this.sendEmail(mail);
        return rta;
    }

    async sendEmail(infoMail){
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, 
            auth: {
              user: config.email,
              pass: config.passwordMail,
            },
          });
        await transporter.sendMail(infoMail);
        return { message : 'Mail sent' }     
    }

    async changePassword(token, newPassword){
        try {
            const payload = jwt.verify(token,config.jwtSecret);
            const user = await service.findById(payload.sub);
            if(user.recoveryToken !== token){
                throw boom.unauthorized()
            }
            const newPasswordHash = await bcrypt.hash(newPassword,10);

            await service.update(user.idUser,{
                recoveryToken : null,
                passwordHash : newPasswordHash,
            });
            return {message : 'Password changed with success'};
        } catch (error) {
            throw boom.unauthorized();
        }
    }
} 

module.exports = AuthService;