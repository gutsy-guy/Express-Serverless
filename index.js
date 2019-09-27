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
const app = express()
app.use(bodyParser.json())

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


const client = require('./db_client.js')

const registerController = require('./controllers/register')
const loginController = require('./controllers/login')

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

//TODO: add authorization for registering user and (possibly separate database for admin)
app.post('/register', registerController.register)

app.post('/login', loginController.login)

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

http.createServer(app).listen(process.env.PORT)
