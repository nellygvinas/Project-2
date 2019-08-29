const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postingSchema = new Schema({
    title: String,
    creation: Date,
    description: String,
    creator: {type: Schema.Types.ObjectId, ref: 'User'}, 
    child: [{type: Schema.Types.ObjectId, ref: 'Child'}], 
    image: String
})

const postingModel = mongoose.model('Posting', postingSchema)
//mongoose expects the name of the model to be singular and havea capital first letter
//name of the collection in DB will be called celebrities with lower case C because mongoose will do it by magic


module.exports = postingModel;