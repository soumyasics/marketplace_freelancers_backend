const express=require('express')
const bodyParser=require('body-parser')
const db=require('./DBConnection')
const route=require('./routes')
const cors=require('cors')

const app=express()

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use(cors())

app.use('/freelancers_api',route)

app.listen(4011,()=>{
    console.log("Server created successfully");
})