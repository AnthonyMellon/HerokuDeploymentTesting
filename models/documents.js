import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: 3,
        required: true
    },
    description: {
        type: String,
    },
    file: {
        type: String, //Make this a file somehow
        required: true
    },

});

export default mongoose.model('Document', documentSchema);