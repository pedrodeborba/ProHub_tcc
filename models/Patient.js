const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PatientSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
         type: String,
         required: true
     },
     schedules: [
         {
             type: Schema.Types.ObjectId,
             ref: 'Schedule'
         }
     ]
});
mongoose.model('Patient', PatientSchema);