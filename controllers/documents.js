import Document from '../models/documents.js';

/**
 * This function is used to get the documents
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns documents data, or no content when status is 200. Error when status is 500
 */
const getDocuments = async (req, res) => {
    try {
        const documents = await Document.find({});
        if (documents.length != 0) return res.status(200).json({ sucess: true, data: documents });
        return res.status(200).json({success: true, data: 'No content'});
    }   catch (err) {
        return res.status(500).json({
            msg: err.message || 'Something went wrong wile getting all documents',
        });
    }   
};

/**
 * This function is used to create documents
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns documents data when status is 201. error when status is 500
 */
const createDocument = async (req, res) => {
    try {
        await Document.create(req.body);
        const newDocuments = await Document.find({});
        return res.status(201).json({ success: true, data: newDocuments });
    } catch (err) {
        return res.status(500).json({
            msg: err.message || 'Something went wrong while creating a document',
        });
    }
}

/**
 * This function is used to update a document
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns returns 404 when no document found. documents data when status is 200. error when status is 500
 */
const updateDocument = async (req, res) => {
    try {
        const { id } = req.params;
        const document = await Document.findByIdAndUpdate(id, req.body);

        if(!document) {
            return res.status(404).json({
                success: false,
                msg: `No document with the id ${id}`,
            });
        }

        const newDocuments = await Document.find({});
        return res.status(200).json({ success: true, data: newDocuments });
    } catch(err) {
        return res.status(500).json({
            msg: err.message || 'Something went wrong while updating a document',
        });
    }
}

/**
 * This function is used to delete a document
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 404 when document not found. documents data when status is 200. error when status is 500
 */
const deleteDocument = async (req, res) => {
    try {
        const { id } = req.params;
        const document = await Document.findByIdAndRemove(id);

        if(!document) {
            return res.status(404).json({
                success: false,
                msg: `No document with the id ${id}`,
            });
        }

        const newDocuments = await Document.find({});
        return res.status(200).json({ success: true, data: newDocuments });
    } catch (err) {
        return res.status(500).json({
            msg: err.msg || 'Something went wrong while deleting a document'
        });
    }
}

export {
    getDocuments,
    createDocument,
    updateDocument,
    deleteDocument
}