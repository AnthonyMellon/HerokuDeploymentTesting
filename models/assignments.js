import mongoose from "mongoose";

const assignmentsSchema = new mongoose.Schema({
    Title: {
        type: String,  
        minlength: 3,
        required: true      
    },
    Description: {
        type: String,        
    },
    Class: {
        type: String, //Make this a reference to the class document
        required: true
    },
    IssueDate: {
        type: Date,
        required: true
    },
    DueDate: {
        type: Date,
        required: true
    },
    ExtensionLength: {
        type: Number,
    },
    ExtensionGiven: {
        type: Boolean,
        required: true
    },
    Documents: {
        type: String, //Multiple other document documents
    },
    Resources: {
        type: String, //Multiple other resource documents
    },
    todos: {
        type: String, //Multiple other todo documents
    },    
});

export default mongoose.model('Assignment', assignmentsSchema);