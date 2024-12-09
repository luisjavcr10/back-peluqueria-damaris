const User = require('./../models/users.model');

class UserService {

    constructor(){
        
    }
    
    async create(data){
        try {
            if (!data.idRole) {
                throw new Error('El idRole es requerido');
            }
            const user = new User(data);
            await user.save();
            return user;
        } catch (error) {
            throw error; 
        }
    };

    async find(){
        try {
            return await User.find();
        } catch (error) {
            throw error; 
        }
    };

    async findById(id){
        try {
            return await User.findById(id);
        } catch (error) {
            throw error;
        }
    };

    async update(id, changes){
        try {
            return await User.findByIdAndUpdate(id, changes, { new: true });
        } catch (error) {
            throw error; 
        }
    };

    async delete(id){
        try {
            return await User.findByIdAndDelete(id);
        } catch (error) {
            throw error; 
        }
    };
}

module.exports = UserService;