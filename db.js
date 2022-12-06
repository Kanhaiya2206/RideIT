const mongoose = require("mongoose");

function connectDB(){

    mongoose.connect('mongodb+srv://kanhaiya220600:kanhaiya220600@cluster0.yvvkcww.mongodb.net/?retryWrites=true&w=majority/rentCar' , {useUnifiedTopology: true , useNewUrlParser: true})

    const connection = mongoose.connection

    connection.on('connected' , ()=>{
        console.log('Mongo DB Connection Successfull')
    })

    connection.on('error' , ()=>{
        //console.log('Mongo DB Connection Error')
    })


}

connectDB()

module.exports = mongoose