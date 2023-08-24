// express port and path 
const express = require('express');
const path = require('path');
const port = 8000;

// database connectivity
const db = require('./config/mongoose');
const Task = require('./models/tasks');

// firing up the server 
const app = express();

// setting up ejs and paths 
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, 'views'));

// middlewares 
app.use(express.urlencoded());
app.use(express.static("assets"))

// this array was used for testing of the server without db connection, can also be used as a reference to the schema 

// let Tasks = [
//     {
//         name:"Task1",
//         dueDate: '2023-08-10',
//         tag: "tag1",
//         done:true
//     },
//     {
//         name: "Task2",
//         dueDate: "2023-08-11",
//         tag:"tag2",
//         done:false
//     },
//     {
//         name: "Task3",
//         dueDate: "2023-08-12",
//         tag:"tag3",
//         done:false
//     }
// ]

// controller for home page 
app.get('/', (req, res)=>{
    Task.find({}).then((result)=>{
        return res.render('home', {
            title: "TO DO List",
            taskList :result
        })
    }).catch((err)=>{
        console.log("Error in fetching Data");
    })
})

// creating the task 
app.post('/create-task', (req, res)=>{
    Task.create({
        name:req.body.name,
        dueDate:req.body.dueDate,
        tag:req.body.tag,
        done:false
    }).then((result)=>{
        console.log('****', result);
    }).catch((err)=>{
        console.log("Error in adding Data");
    })
    return res.redirect('back');
})

// toggling task, i have used update here 
app.get('/toggle-task', (req, res)=>{
    let id = req.query.id;
    Task.findById(id).then((task)=>{
        const newDone = !task.done;
        Task.updateOne({_id: id}, {$set: {done : newDone}}).then((result)=>{
            console.log(result);
            res.redirect("back");
        }).catch((err)=>{
            console.log("Error");
        })
    }).catch((err)=>{
        console.log("Could Not Find");
    })
    
})

// deleting the task 
app.get('/delete-single-task', (req, res)=>{
    let id = req.query.id;
    Task.findByIdAndDelete(id).then((result)=>{
        return res.redirect('back');
    }).catch((err)=>{
        console.log("Error in deleting the task");
    })
})  

// deleting all the tasks 
app.get('/delete-all-tasks', (req, res)=>{
    Task.deleteMany({}).then(()=>{
        return res.redirect('back');
    }).catch((err)=>{
        console.log("Error in deleting Entries");
    })
})

app.listen(port, (err)=>{
    if(err){
        console.log("Error in loading the page");
    }else{
        console.log(`Your Server is running on port ${port}`);
    }
})