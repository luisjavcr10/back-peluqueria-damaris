const Employee = require('./../models/employee.model');

class EmployeeService {
    async create(data){
        try {
            if (!data.idUser) {
                throw new Error('El idUser es requerido');
            }
            const employee = new Employee(data);
            await employee.save();
            return employee;
        } catch (error) {
            console.error('Error al crear el empleado:', error.message);
            throw error;
        }
    };

    async find(){
        try {
            return await Employee.find();
        } catch (error) {
            console.error('Error al obtener empleados:', error);
            throw new Error('No se pudieron obtener los empleados');

        }
    };

    async findById(id){
        try {
            return await Employee.findById(id);
        } catch (error) {
            console.error('Error al buscar el empleado:', error.message);
            throw error;
        }
    };

    async update(id, changes){
        try {
            return await Employee.findByIdAndUpdate(id, changes, { new: true });
        } catch (error) {
            console.error('Error al actualizar el empleado:', error.message);
            throw error;
        }
    };

    async delete(id){
        try {
            return await Employee.findByIdAndDelete(id);
        } catch (error) {
            console.log('Error al eliminar el empleado', error.message);
            throw error; 
        }
    };
}

module.exports = EmployeeService;