// import dependencies
const config = require('config');
const port = config.get('appport');
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
// import routes
const journey_route = require('./controllers/routes/journey_route');
const leetcode_route = require('./controllers/routes/leetcode_route');
const tech_route = require('./controllers/routes/tech_route');


// import resp body
const ErrorResponseBody = require('./utils/errorResp');
const ServerError = require('./utils/serverError');



const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));

// main page
app.get("/", (req, res) => {
    res.json({
        title: "Blog backend"
    })
})

// journey page
app.use('/journey', journey_route);

// leetcode page
app.use('/leetcode', leetcode_route);

// tech page
app.use('/technical', tech_route);


// error handler for invalid routes
app.all('*', (req, res, next) => {
    next(new ServerError(404, "Route Not Found"));
});

//General error handler function for any internal errors while performing db operations
app.use((err, req, res, next) => {
    console.log(err);
    let error;
    const { status, statusCode = 500, message = "Internal Server Error" } = err;
    error = new ErrorResponseBody(status, message, false);
    res.status(statusCode).json(error);
})

module.exports = app;
