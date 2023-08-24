const mongoose = require('mongoose');
const taskSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    dueDate:{
        type: String,
        required:true,
        default:Date.now()
    },
    tag: {
        type:String,
        required: true
    }, 
    done:{
        type:Boolean,
        required:true,
    }
})

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;

