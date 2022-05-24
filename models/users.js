import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';

const usersSchema = new mongoose.Schema({
    firstName: {
        type: String,
        minlength: 3,
        required: true
    },
    lastName: {
        type: String,
        minlength: 3,
        required: true
    },
    Classes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Class"
        },
    ],
    DateOfBirth: {
        type: Date,
        required: true
    },
    Gender: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true, 
        minlength: 6, 
    }
});

//Salt and hash the password
usersSchema.pre('save', async function() {
    const salt = await bcryptjs.genSalt(10)
    this.password = await bcryptjs.hash(this.password, salt);
});

 usersSchema.methods.comparePassword = function (password) {
     return bcryptjs.compare(password, this.password);
 };

export default mongoose.model("User", usersSchema);