import Resource from '../models/resources.js'

/**
 * This function is used to get the resources
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns resources data, or no content when status is 200. Error when status is 500
 */
const getResources = async (req, res) => {
    try {
        const resources = await Resource.find({});
        if (resources.length != 0) return res.status(200).json({ sucess: true, data: resources });
        return res.status(200).json({success: true, data: 'No content'});
    }   catch (err) {
        return res.status(500).json({
            msg: err.message || 'Something went wrong wile getting all resources',
        });
    }   
};

/**
 * This function is used to create resources
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns resources data when status is 201. error when status is 500
 */
const createResource = async (req, res) => {
    try {
        await Resource.create(req.body);
        const newResources = await Resource.find({});
        return res.status(201).json({ success: true, data: newResources });
    } catch (err) {
        return res.status(500).json({
            msg: err.message || 'Something went wrong while creating a resource',
        });
    }
}

/**
 * This function is used to update a resource
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns returns 404 when no resource found. resources data when status is 200. error when status is 500
 */
const updateResource = async (req, res) => {
    try {
        const { id } = req.params;
        const resource = await Resource.findByIdAndUpdate(id, req.body);

        if(!resource) {
            return res.status(404).json({
                success: false,
                msg: `No resource with the id ${id}`,
            });
        }

        const newResources = await Resource.find({});
        return res.status(200).json({ success: true, data: newResources });
    } catch(err) {
        return res.status(500).json({
            msg: err.message || 'Something went wrong while updating a resource',
        });
    }
}

/**
 * This function is used to delete a resource
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 404 when resource not found. resources data when status is 200. error when status is 500
 */
const deleteResource = async (req, res) => {
    try {
        const { id } = req.params;
        const resource = await Resource.findByIdAndRemove(id);

        if(!resource) {
            return res.status(404).json({
                success: false,
                msg: `No resource with the id ${id}`,
            });
        }

        const newResources = await Resource.find({});
        return res.status(200).json({ success: true, data: newResources });
    } catch (err) {
        return res.status(500).json({
            msg: err.msg || 'Something went wrong while deleting a resource'
        });
    }
}

export {
    getResources,
    createResource,
    updateResource,
    deleteResource
}