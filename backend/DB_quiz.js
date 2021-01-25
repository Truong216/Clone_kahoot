// import mongoose from 'mongoose'
const mongoose = require('mongoose');
const kahootSchema = mongoose.Schema({
    quiz: Object,
}) 
// export default mongoose.model('answercontents', kahootSchema)
module.exports = mongoose.model('answercontents', kahootSchema)