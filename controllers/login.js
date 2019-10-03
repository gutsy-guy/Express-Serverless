const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.login = (req,res,next) => {
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
    
}