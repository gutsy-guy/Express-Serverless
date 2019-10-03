const jwt = require('jsonwebtoken')

auth = ((req,res,next)=>{
    try {
        jwt.verify(req.body.token, process.env.JWT_ADMIN_KEY)
        next()
    } 
    catch {
        res.status(401).send({ message: "Authorization Error" })
    }
})

module.exports = auth