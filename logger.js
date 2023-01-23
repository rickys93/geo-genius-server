// Middleware that logs any attempt to talk to the API.

// req -> [logger (console.log key details)] -> [cors (add header to response)] -> [API] -> response
// req -> [auth (check the req headers for a key)] -> [API] -> response

function logger(req, res, next) {
    // next - the next step down in the API
    // (could be the next layer in the middleware)

    console.log(req.method, req.originalUrl);

    // pass to the next layer
    next();
}

module.exports = logger;
