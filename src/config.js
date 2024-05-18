const mongoose = require("mongoose"); // importing mongoose library
const connect = mongoose.connect("mongodb://127.0.0.1:27017/logindb"); //creating connection query

//checking that connection works or not

connect.then(()=>{
    console.log("Database successfully connected");
})
.catch((error)=>{
    console.log("Unable to connect to db " + error);
})

//creating schema

const LoginSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
})

//collection part

const collection = new mongoose.model("user",LoginSchema);

module.exports = collection;
