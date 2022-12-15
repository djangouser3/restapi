const express = require('express')
const {v4} = require('uuid')//for generating ids for users
const path = require('path')
const app = express()

const CONTACTS = [
    {id: v4(), name: "vlad", value: '+7-921-100-20', marked:false}
]
app.use(express.json())
//GET response method of api from server
app.get('/api/contacts',(req,res)=>{
     setTimeout(()=>{
        res.status(200).json(CONTACTS)
     },500)
    
})



//POST
app.post('/api/contacts',(res,req)=>{
    const contact = {...req.body, id: v4() , marked : false}
    CONTACTS.push(contact)
    
    res.status(201).json(contact)//201 - element was created
})


//make static dir for file to find frontend.js in static path src="frontend.js"
app.use(express.static(path.resolve(__dirname, 'client')))
//get method for all routs 
//sendFile from __dirname current directory , dir client , file index.html
app.get("*",(req, res)=>{
    res.sendFile(path.resolve(__dirname,'client','index.html'))
}) 

//npm run start (server) app.listen will report in console
app.listen(3000,()=>{
    console.log("server started on 3000 port ...")
})//listen port 3000 and report