import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
    Title: {
        type: String,
        minlength: 3,
        required: true
    },
    Description: {
        type: String,
    },
    CourseDirective: {
        type: String, //Single other document document
    },
    Lecturers: {
        type: String, //Multiple other lecturer documents
    },
    Assignments: {
        type: String, //Multiple other assignment documents
    }, 
    user: [
        {
            type: String,
        }        
    ]   
});

export default mongoose.model('Class', classSchema);