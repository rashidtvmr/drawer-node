const AnnotationModel = require('../model/Drawing');

const createAnnotations = (req, res) => {
    AnnotationModel.findOne({ _id: req.body.id }).then(response => {
        if (!response) {
            newAnnoationModel = new AnnotationModel({
                annotations: req.body.annotations,
                createdBy: req.user.id,
            });
            newAnnoationModel.save().then(saved => {
                console.log('saved>,saved', saved)
                res.json({ message: 'Annoations created' });
            })
        }
        else {
            console.log(req.body, response, 'new?')
            response.annotations = req.body.annotations;
            response.createdBy = req.user.id;
            response.save().then(saved => {
                console.log('saved>,saved', saved)
                res.json({ message: 'Annoations created' });
            })
        }
    }).catch(error => {
        res.json({ status: 500, message: 'Unable t0 create annotations' })
    });
}

const getUsersAnnotations = (req, res) => {
    AnnotationModel.find({ createdBy: req.user.id }).then(userAnnoations => {
        res.json({ data: userAnnoations });
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