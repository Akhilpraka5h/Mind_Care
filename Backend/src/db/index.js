//import mongoose
const mongoose=require('mongoose')

//create a connection string to db
const connectionString=process.env.DATABASE

//connect
mongoose.connect(connectionString,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
    console.log('connected to db')
})
.catch((error)=>{
    console.log(error)
})
