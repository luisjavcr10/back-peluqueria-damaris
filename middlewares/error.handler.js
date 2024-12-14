const boom = require('@hapi/boom');

class ErrorHandler {
    logErrors(err, req, res, next) {
        console.error(err);
        next(err);
    }

    boomErrorHandler(err, req, res, next) {
        if (err.isBoom) {
            const { output } = err; 
            res.status(output.statusCode).json(output.payload);
        } else {
            next(err);
        }    
    }

    errorHandler(err, req, res, next) {
        const statusCode = err.status || 500;
        res.status(statusCode).json({
            message: err.message,
            stack: err.stack,
        });
    }
}

module.exports = new ErrorHandler();