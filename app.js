import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from "express";
import rateLimit from 'express-rate-limit';
import helmet from "helmet";

import conn from './db/connection.js';



//Access all the routes exported from the various routes files
import auth from './routes/auth.js';
import users from './routes/users.js';
import assignments from './routes/assignments.js';
import classes from './routes/classes.js';
import lecturers from './routes/lecturers.js';
import resources from './routes/resources.js';
import documents from './routes/documents.js';
import todos from './routes/todo.js';

import authRoute from './middleware/auth.js';

dotenv.config();
const app = express();
app.use(helmet());
const PORT = process.env.PORT || 3000;

const limit = rateLimit({
    windowMS: 60 * 1000,
    max: 25,
});

//Express middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

//To make it clear to the consumer that the application is an API, prefic the endpoint with /api
app.use('/api/v1', auth);
app.use('/api/v1/assignments', authRoute, assignments);
app.use('/api/v1/classes', authRoute, classes);
app.use('/api/v1/lecturers', authRoute, lecturers);
app.use('/api/v1/resources', authRoute, resources);
app.use('/api/v1/documents', authRoute, documents);
app.use('/api/v1/todos', authRoute, todos);

app.use(function (req, res, next) {
    res.status(404)
    if(req.accepts('json')) {
        res.json({ success: false, error: "404 No endpoint found"})
    }
});

const start = async () => {
    try {
        await conn(process.env.MONGO_URI); //Access the connectiong string in .env
        app.listen(PORT, () => {console.log(`Server is listening on port ${PORT}`)});
    } catch (err) {
        console.log(err);
    }
};

start();

export default app;
