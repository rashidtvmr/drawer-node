const AnnotationModel = require('../model/Drawing');

const createAnnotations = (req, res) => {
    AnnotationModel.findOneAndUpdate(req.body.id).then(response => {
        response.annotations = req.body.annotations;
        response.createdBy = req.user.id;
        response.save().then(saved => {
            res.json({ message: 'Annoations created' });
        })
    }).catch(error => {
        res.json({ status: 500, message: 'Unable t0 create annotations' })
    });
}

const getUsersAnnotations = (req, res) => {
    AnnotationModel.find({ createdBy: req.user.id }).then(userAnnoations => {
        // if(userAnnoations.length > 0){
        res.json({ data: userAnnoations });
        // }
    }).catch(err => {
        res.json({ status: 500, message: 'Unable to find your annotations' })
    });
}

const getAnnotationsByID = (req, res) => {
    AnnotationModel.findById(req.params.id).then(userAnnoations => {
        console.log(userAnnoations, req.params)
        res.json([...userAnnoations.annotations]);
    }).catch(err => {
        res.json({ status: 500, message: 'Unable to find your annotations' })
    });
}

module.exports = {
    createAnnotations, getUsersAnnotations, getAnnotationsByID
}