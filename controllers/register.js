const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(Number(process.env.SALT))

exports.register = (req,res,next) => {
    let hash = bcrypt.hashSync(req.body.password,salt)
    collection.insertOne({
        userid : req.body.userid,
        password: hash
    }, (err, result) => {
        if (err){ 
            res.status(400).send({message: err})
        }
        res.status(200).send()
    })
}

