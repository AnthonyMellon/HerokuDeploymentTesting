import Lecturer from '../models/lecturer.js';

/**
 * This function is used to get the lecturers
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns lecturers data, or no content when status is 200. Error when status is 500
 */
const getLecturers = async (req, res) => {
    try {
        const lecturers = await Lecturer.find({});
        if (lecturers.length != 0) return res.status(200).json({ sucess: true, data: lecturers });
        return res.status(200).json({success: true, data: 'No content'});
    }   catch (err) {
        return res.status(500).json({
            msg: err.message || 'Something went wrong wile getting all lecturers',
        });
    }  
};

/**
 * This function is used to create lecturers
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns lecturers data when status is 201. error when status is 500
 */
const createLecturer = async (req, res) => {
    try {
        await Lecturer.create(req.body);
        const newLecturers = await Lecturer.find({});
        return res.status(201).json({ success: true, data: newLecturers });
    } catch (err) {
        return res.status(500).json({
            msg: err.message || 'Something went wrong while creating a lecturer',
        });
    }
}

/**
 * This function is used to update a lecturer
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns returns 404 when no lecturer found. lecturers data when status is 200. error when status is 500
 */
const updateLecturer = async (req, res) => {
    try {
        const { id } = req.params;
        const lecturer = await Lecturer.findByIdAndUpdate(id, req.body);

        if(!lecturer) {
            return res.status(404).json({
                success: false,
                msg: `No lecturer with the id ${id}`,
            });
        }

        const newLecturers = await Lecturer.find({});
        return res.status(200).json({ success: true, data: newLecturers });
    } catch(err) {
        return res.status(500).json({
            msg: err.message || 'Something went wrong while updating a lecturer',
        });
    }
}

/**
 * This function is used to delete a lecturer
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 404 when lecturer not found. lecturers data when status is 200. error when status is 500
 */
const deleteLecturer = async (req, res) => {
    try {
        const { id } = req.params;
        const lecturer = await Lecturer.findByIdAndRemove(id);

        if(!lecturer) {
            return res.status(404).json({
                success: false,
                msg: `No lecturer with the id ${id}`,
            });
        }

        const newLecturers = await Lecturer.find({});
        return res.status(200).json({ success: true, data: newLecturers });
    } catch (err) {
        return res.status(500).json({
            msg: err.msg || 'Something went wrong while deleting a lecturer'
        });
    }
}

export {
    getLecturers,
    createLecturer,
    updateLecturer as updateLecturers,
    deleteLecturer
}