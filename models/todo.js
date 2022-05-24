import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: 3,
        required: true
    },
    description: {
        type: String,
    },
    done: {
        type: Boolean,
        required: true
    },
});

export default mongoose.model('Todo', todoSchema);