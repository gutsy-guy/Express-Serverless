const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const client = require('../db_client')


//TODO: think of better way to structure (right now each method has to connect to client)
exports.login = (req,res,next) => {
    client.connect((error,client)=>{
        if (error){
            throw error
        }
        database = client.db(process.env.DB_NAME)
        collection = database.collection(process.env.DB_STUDENT_COLLECTION)
        console.log("Connected to database")

        collection.findOne({_id: req.body.userid}, (err,data)=>{
            if (err){
                return res.status(500).send({message: err})
            }
            
            if (data === null ){
                return res.status(404).send({message: "User does not exist"}) 
            }
            
            else if (!bcrypt.compareSync(req.body.password, data.password)){
                return res.status(403).send({message: "Incorrect password"})
            }
    
            token = jwt.sign({
                    "_id": data._id,
                    "username": data.username
                    },process.env.JWT_PRIVATE_KEY)    //sign the username (optional: expiry time)
    
            res.status(200).send({
                message: "Authentication Successful",
                token: token
            })
        })
    })
}


exports.adminLogin = (req,res,next) => {
    client.connect((error,client)=>{
        if (error){
            throw error
        }
        database = client.db(process.env.DB_NAME)
        collection = database.collection(process.env.DB_STUDENT_COLLECTION)
        admincollection = database.collection(process.env.DB_ADMIN_COLLECTION)
        console.log("Connected to database")

        admincollection.findOne({_id: req.body.userid}, (err,data)=>{
            if (err){
                return res.status(500).send({message: err})
            }
            
            if (data === null ){
                return res.status(404).send({message: "User does not exist"}) 
            }
            
            else if (!bcrypt.compareSync(req.body.password, data.password)){
                return res.status(403).send({message: "Incorrect password"})
            }
    
            token = jwt.sign({
                    "_id": data._id,
                    "username": data.username
                    },process.env.JWT_ADMIN_KEY)    //sign the username (optional: expiry time)
    
            res.status(200).send({
                message: "Authentication Successful",
                token: token
            })
        })
    })
}