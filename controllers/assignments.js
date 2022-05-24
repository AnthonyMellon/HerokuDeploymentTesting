import Assignment from '../models/assignments.js';

/**
 * This function is used to get the assignments
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns assignments data, or no content when status is 200. Error when status is 500
 */
const getAssignments = async (req, res) => {
    try {
        const assignments = await Assignment.find({});
        if(assignments.length != 0) return res.status(200).json({ sucess: true, data: assignments });        
        return res.status(200).json({success: true, data: 'No content'});
    }   catch (err) {
        return res.status(500).json({
            msg: err.message || 'Something went wrong wile getting all assignments',
        });
    }  
};

/**
 * This function is used to create assignments
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns assignments data when status is 201. error when status is 500
 */
const createAssignment = async (req, res) => {
    try {
        await Assignment.create(req.body);
        const newAssignments = await Assignment.find({});
        return res.status(201).json({ success: true, data: newAssignments });
    } catch (err) {
        return res.status(500).json({
            msg: err.message || 'Something went wrong while creating an assignment',
        });
    }
}

/**
 * This function is used to update an assignment
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns returns 404 when no assignment found. assignments data when status is 200. error when status is 500
 */
const updateAssignment = async (req, res) => {
    try {
        const { id } = req.params;
        const assignment = await Assignment.findByIdAndUpdate(id, req.body);

        if(!assignment) {
            return res.status(404).json({
                success: false,
                msg: `No assignment with the id ${id}`,
            });
        }

        const newAssignments = await Assignment.find({});
        return res.status(200).json({ success: true, data: newAssignments });
    } catch(err) {
        return res.status(500).json({
            msg: err.message || 'Something went wrong while updating an assignment',
        });
    }
}

/**
 * This function is used to delete an assignment
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 404 when assignment not found. assignments data when status is 200. error when status is 500
 */
const deleteAssignment = async (req, res) => {
    try {
        const { id } = req.params;
        const assignment = await Assignment.findByIdAndRemove(id);

        if(!assignment) {
            return res.status(404).json({
                success: false,
                msg: `No assignment with the id ${id}`,
            });
        }

        const newAssignments = await Assignment.find({});
        return res.status(200).json({ success: true, data: newAssignments });
    } catch (err) {
        return res.status(500).json({
            msg: err.msg || 'Something went wrong while deleting an assignment'
        });
    }
}

export {
    getAssignments,
    createAssignment,
    updateAssignment,
    deleteAssignment
}