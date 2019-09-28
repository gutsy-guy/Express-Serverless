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

const client = require('./db_client.js')

const registerController = require('./controllers/register')
const loginController = require('./controllers/login')
const documentsController = require('./controllers/documents')

const authorization = require('./middle_wares/authorization')

client.connect((error,client)=>{
    if (error){
        throw error
    }
    database = client.db(process.env.DB_NAME)
    collection = database.collection(process.env.DB_STUDENT_COLLECTION)
    console.log("Connected to database")
})

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
  });

//TODO: add authorization for registering user and (possibly separate database for admin)
app.post('/register', registerController.register)

app.post('/login', loginController.login)

app.get('/documents', authorization, documentsController.getDocuments)

//get the specific document
app.get('/document', authorization, documentsController.getDocument)

app.put('/documents', authorization, documentsController.addDocument)

app.delete('/documents', authorization, documentsController.deleteDocument)

app.patch('/documents',authorization, documentsController.updateDocument)

http.createServer(app).listen(process.env.PORT)
