
require('dotenv').config()
const http = require('http')

//[2]"academind/node-restful-api-tutorial", GitHub, 2019. [Online]. Available: https://github.com/academind/node-restful-api-tutorial/tree/13-controllers. [Accessed: 18- Oct- 2019].
const express = require('express')
const bodyParser = require("body-parser")
const app = express()
app.use(bodyParser.json())

const registerController = require('./controllers/register')
const loginController = require('./controllers/login')
const documentsController = require('./controllers/documents')

const authorization = require('./middle_wares/authorization')
const adminAuthorization = require('./middle_wares/adminAuthorization')

var cors = require('cors')

// client.connect((error,client)=>{
//     if (error){
//         throw error
//     }
//     database = client.db(process.env.DB_NAME)
//     collection = database.collection(process.env.DB_STUDENT_COLLECTION)
//     admincollection = database.collection(process.env.DB_ADMIN_COLLECTION)
//     console.log("Connected to database")
// })

//[2]"academind/node-restful-api-tutorial", GitHub, 2019. [Online]. Available: https://github.com/academind/node-restful-api-tutorial/tree/13-controllers. [Accessed: 18- Oct- 2019].
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*');
    if (req.method === "OPTIONS"){  //to enable cors
      return res.status(200).json({})
    }
    next();
  });

// app.use(cors()) //enable CORS

// app.options('*', function (req,res) { res.sendStatus(200); });

app.post('/register', adminAuthorization, registerController.register)
// To add user without admin credential, disable the line below and enable the line above
// app.post('/register', registerController.register)

app.post('/adminlogin', loginController.adminLogin)

app.post('/login', loginController.login)

app.post('/getalldocuments', authorization, documentsController.getDocuments)

//get the specific document
app.post('/readdocument', authorization, documentsController.getDocument)

app.put('/documents', authorization, documentsController.addDocument)

app.delete('/documents', authorization, documentsController.deleteDocument)

app.patch('/documents',authorization, documentsController.updateDocument)

//To enable CORS for OPTIONS method
app.use((err, req, res, next) => {
  res.status(200);
  res.json({
    message: err.message
  });
});

http.createServer(app).listen(process.env.PORT)

module.exports = app