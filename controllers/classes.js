import Class from '../models/class.js';
import User from '../models/users.js';

/**
 * This function is used to get the classes
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns classes data, or no content when status is 200. Error when status is 500
 */
const getClasses = async (req, res) => {
    try {
        const classes = await Class.find({});
        if (classes.length != 0) return res.status(200).json({ sucess: true, data: classes });
        return res.status(200).json({success: true, data: 'No content'});
    }   catch (err) {
        return res.status(500).json({
            msg: err.message || 'Something went wrong wile getting all classes',
        });
    }  
};

/**
 * This function is used to create classes
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns classes data when status is 201. error when status is 500
 */
const createClass = async (req, res) => {
    try {
        const myClass = new Class(req.body);
        await myClass.save();

        //Find a user by its id, then push the created class to its list of classes
        const user = await User.findbyId({
            _id: myClass.user
        })
        user.classes.push(myClass);
        await user.save();

        const newClasses = await Class.find({});
        return res.status(201).json({ success: true, data: newClasses });
    } catch (err) {
        return res.status(500).json({
        msg: err.message || 'Something went wrong while creating a class',
        });
    }
}

/**
 * This function is used to update a class
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns returns 404 when no class found. classes data when status is 200. error when status is 500
 */
const updateClass = async (req, res) => {
    try {
        const { id } = req.params;
        const myClass = await Class.findByIdAndUpdate(id, req.body);

        if(!myClass) {
            return res.status(404).json({
                success: false,
                msg: `No class with the id ${id}`,
            });
        }

        const newClasses = await Class.find({});
        return res.status(200).json({ success: true, data: newClasses });
    } catch(err) {
        return res.status(500).json({
            msg: err.message || 'Something went wrong while updating a class',
        });
    }
}

/**
 * This function is used to delete a calss
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 404 when class not found. classes data when status is 200. error when status is 500
 */
const deleteClass = async (req, res) => {
    try {
        const { id } = req.params;
        const myClass = await Class.findByIdAndRemove(id);

        if(!myClass) {
            return res.status(404).json({
                success: false,
                msg: `No class with the id ${id}`,
            });
        }

        const newClasses = await Class.find({});
        return res.status(200).json({ success: true, data: newClasses });
    } catch (err) {
        return res.status(500).json({
            msg: err.msg || 'Something went wrong while deleting a class'
        });
    }
}

export {
    getClasses,
    createClass,
    updateClass,
    deleteClass
}