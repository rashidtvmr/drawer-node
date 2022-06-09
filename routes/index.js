var express = require('express');
const { createAnnotations, getUsersAnnotations, getAnnotationsByID } = require('../controller/annotation');
var router = express.Router();
const auth = require('../middleware/auth')
/* GET home page. */

router.get('/annotation/:id', auth, getAnnotationsByID);
router.get('/annotations', auth, getUsersAnnotations);

router.post('/annotations', auth, createAnnotations)

router.get('/', function (req, res, next) {
  res.send({ title: 'Express' });
});
module.exports = router;
