const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScheduleSchema = new Schema({
    dateString: {
        type: String,
        required: true
    },
    day: {
        type: Number,
        required: true
    },
    month: {
        type: Number,
        required: true
    },
    timestamp: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    time: {
        type: String,
        required: true,
        unique: true
    },
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
    }
}, { timestamps: true });

mongoose.model('Schedule', ScheduleSchema);
