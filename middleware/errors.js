// 404 error creator:
// no specified route meaning all server requests will pass through this middleware
const notFound = (req, res, next) => {
    const error = new Error(`Not Found = ${req.originalUrl}`);
    res.status(404);

    next(error);
};

//error handling middleware:
//this middleware will be fired off only when error object exists in the app
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
};

export { notFound, errorHandler };