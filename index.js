/**
 * TODOs:
 *  (1) Refactor and use cloud services (APIGateway, Lambda Function)
 *  (2) If have time, refactor into separate modules with controllers
 *  (3) Think of better data structure for storing user detail
 */

require('dotenv').config()
const http = require('http')

const express = require('express')
const bodyParser = require("body-parser")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const salt = bcrypt.genSaltSync(9)
const port = 8080

const app = express()
app.use(bodyParser.json())

const client = require('./db_client.js')

client.connect((error,client)=>{
    if (error){
        throw error
    }
    database = client.db(process.env.DB_NAME)
    collection = database.collection(process.env.DB_STUDENT_COLLECTION)
    console.log("Connected to database")
})

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
  });

// app.post('/register', (req, res, next)=>{
//     let hash = bcrypt.hashSync(req.body.password,salt)
//     collection.insertOne({
//         username: req.body.username,
//         password: hash
//     }, (err, result) => {
//         if (err){
//             return res.status(500).send(err)
//         }
//         res.send(result.result)
//     })
// })

const registerController = require('./controllers/register')

app.post('/register', registerController.register)

app.post('/login',(req,res,next)=>{
    collection.findOne({username: req.body.username}, (err,data)=>{
        if (err) { return res.status(500).send({message: "Server error"}) }
        
        if (data === null) { 
            return res.status(404).send({message: "User does not exist"}) 
        }

        else {
            if (bcrypt.compareSync(req.body.password,data.password)){
                token = jwt.sign({"username": data.username},process.env.JWT_PRIVATE_KEY)    //sign the username (optional: expiry time)
                res.status(200).send({
                    message: "Authentication Successful",
                    token: token
                })
            }

            else{
                res.status(403).send({message: "Incorrect password"})
            }
        }
    })
})

authorization = ((req,res,next)=>{
    try {
        let user = jwt.verify(req.body.token, process.env.JWT_PRIVATE_KEY)
        next(user)
    } 
    catch {
        res.status(401).send({ message: "Authorization Error" })
    }
})

app.post('/documents', authorization,(user, req,res,next)=>{
    console.log(user)
    //TODO: to retrieve the documents the user has saved from the database
})

http.createServer(app).listen(port)
