import mongoose from "mongoose";

const resourcesSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: 3,
        required: true
    },
    description: {
        type: String,
    },
    url: {
        type: String,
        required: true
    },
});

export default mongoose.model('Resource', resourcesSchema);