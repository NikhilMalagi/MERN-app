const express = require('express');
/* For parsing the JSON request sent */
const bodyParser = require('body-parser');

/* Segregating the routes */
const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes');
/* Http Error class which construts the message and status */
const HttpError = require('./models/http-error');

const app = express();

/* Parsing the JSON request */
app.use(bodyParser.json());

/* basename for the route and redirected to the placesRoutes middleware */
app.use('/api/places', placesRoutes); // => /api/places...
app.use('/api/users', usersRoutes);

/* Whenever none of the above route matches, no response will be sent.hence this middleware is called to handle the missing route */
app.use((req, res, next) => {
    const error = new HttpError('Could not find this route.', 404);
    throw error;
});

/* Special Middleware : Gets called if any error is thrown/forwareded to from the previous middleware */
app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500)
    res.json({ message: error.message || 'An unknown error occurred!' });
});

app.listen(5000);