const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(Number(process.env.SALT))

exports.register = (req,res,next) => {
    // To check if all input field provided
    if ( req.body.userid && req.body.username && req.body.password){
        let hash = bcrypt.hashSync(req.body.password,salt)
        collection.insertOne({
                _id : req.body.userid,
                username: req.body.username,
                password: hash,
                documents: []
            }, (err, result) => {
                if (err){ 
                    return res.status(400).send({message: err})
                }
                return res.status(200).send({message: "userid: "+req.body.userid+ " added to the system."})
            })
    }
    else{
        return res.status(400).send("All arguments must be provided.")
    }
}

