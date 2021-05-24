const mongoose = require('mongoose')

const SeatSchema = new mongoose.Schema({
    row: {
        type: String,
        required: true
    },
    seatNumber: {
        type: String,
        required: true
    },
    available: {
        type: Boolean,
        required: true,
        default: true
    }
})

module.exports = mongoose.model('Seat', SeatSchema)