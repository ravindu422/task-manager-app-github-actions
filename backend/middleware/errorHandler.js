export const notFound = (req, res, next) => {
    const error = new Error(`Not Found = ${req.originalUrl}`);
    req.status(404);
    next(error);
};

export const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    res.status(statusCode).json({
        success: false, 
        message: err.message,
    })
}