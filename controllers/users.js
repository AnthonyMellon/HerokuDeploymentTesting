import User from '../models/users.js';

/**
 * This function is used to get the users
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns users data, or no content when status is 200. Error when status is 500
 */
const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        if (users.length != 0) return res.status(200).json({ sucess: true, data: users });
        return res.status(200).json({success: true, data: 'No content'});
    }   catch (err) {
        return res.status(500).json({
            msg: err.message || 'Something went wrong wile getting all users',
        });
    }
};

/**
 * This function is used to create users
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns users data when status is 201. error when status is 500
 */
const createUser = async (req, res) => {
    try {
        await User.create(req.body);
        const newUsers = await User.find({});
        return res.status(201).json({ success: true, data: newUsers });
    } catch (err) {
        return res.status(500).json({
            msg: err.message || 'Something went wrong while creating a user',
        });
    }
};

/**
 * This function is used to update a user
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns returns 404 when no user found. users data when status is 200. error when status is 500
 */
const updateUsers = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndUpdate(id, req.body);

        if(!user) {
            return res.status(404).json({
                success: false,
                msg: `No user with the id ${id}`,
            });
        }

        const newUsers = await User.find({});
        return res.status(200).json({ success: true, data: newUsers });
    } catch(err) {
        return res.status(500).json({
            msg: err.message || 'Something went wrong while updating a user',
        });
    }
};

/**
 * This function is used to delete a user
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 404 when user not found. users data when status is 200. error when status is 500
 */
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndRemove(id);

        if(!user) {
            return res.status(404).json({
                success: false,
                msg: `No user with the id ${id}`,
            });
        }

        const newUsers = await User.find({});
        return res.status(200).json({ success: true, data: newUsers });
    } catch (err) {
        return res.status(500).json({
            msg: err.msg || 'Something went wrong while deleting a user'
        });
    }
};

export {
    getUsers,
    createUser,
    updateUsers,
    deleteUser
}