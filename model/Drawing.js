const { default: mongoose } = require("mongoose");

const annotationSchema = mongoose.Schema({
    annotations: {
        type: Array
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
}, { timestamps: true });

module.exports = mongoose.model('annotations', annotationSchema);