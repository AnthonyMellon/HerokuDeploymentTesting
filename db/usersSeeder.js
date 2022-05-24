import dotenv from 'dotenv';

import User from '../models/users.js';
import { users } from '../data/users.js';

import conn from './connection.js';

dotenv.config();

conn(process.env.MONGO_URI); //Connect to MongoDB atlas

//Users
const createUsers = async () => {
    try {
        await User.deleteMany(); //Delete all documents in the users collection
        await User.insertMany(users); //Insert documents into the users collection

        console.log('Users data sucessfully created');
        process.exit(); //Exit the process
    } catch (err) {
        console.log(err);
        process.exit(1); //Exit the process with an error
    }
};

const deleteUsers = async () => {
    try {
        await User.deleteMany(); //Delete all documents in the users collection

        console.log('User data sucessfully deleted');
        process.exit();
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

switch (process.argv[2]) {
    case '-d': {
        //This case is looking for a specefic flag, i.e., -d
        deleteUsers();
        break;
    }
    default: {
        createUsers();
    }
}