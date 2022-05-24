import mongoose from "mongoose";

const LecturerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        minlength: 3,
        required: true
    },
    LastName: {
        type: String,
        minlength: 3,
        required: true
    },
    Email: {
        type: String,
        minlength: 3,
        required: true
    },
    office: {
        type: String,
    },
    classes: {
        type: String, //Multiple other class documents
    },
});

export default mongoose.model('Lecturer', LecturerSchema);