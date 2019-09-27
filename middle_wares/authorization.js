const jwt = require('jsonwebtoken')

auth = ((req,res,next)=>{
    try {
        let user = jwt.verify(req.body.token, process.env.JWT_PRIVATE_KEY)
        next(user)
    } 
    catch {
        res.status(401).send({ message: "Authorization Error" })
    }
})

module.exports = auth