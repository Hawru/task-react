const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const taskSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        title: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        priority: [{
            type: String,
            default: "Not important"
        }],
        date: {
            type: Date,
            required: true
        },
        done: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
)

taskSchema.plugin(AutoIncrement, {
    inc_field: 'num',
    id: 'taskNum',
    start_seq: 1
})

module.exports = mongoose.model('Task', taskSchema)