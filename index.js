
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
const adminAuthorization = require('./middle_wares/adminAuthorization')

client.connect((error,client)=>{
    if (error){
        throw error
    }
    database = client.db(process.env.DB_NAME)
    collection = database.collection(process.env.DB_STUDENT_COLLECTION)
    admincollection = database.collection(process.env.DB_ADMIN_COLLECTION)
    console.log("Connected to database")
})

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
  });

//TODO: add authorization for registering user and (possibly separate database for admin)
app.post('/register', adminAuthorization, registerController.register)

app.post('/adminlogin', loginController.adminLogin)

app.post('/login', loginController.login)

app.get('/documents', authorization, documentsController.getDocuments)

//get the specific document
app.get('/doc', authorization, documentsController.getDocument)

app.put('/documents', authorization, documentsController.addDocument)

app.delete('/documents', authorization, documentsController.deleteDocument)

app.patch('/documents',authorization, documentsController.updateDocument)

http.createServer(app).listen(process.env.PORT)
