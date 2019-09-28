//TODO: to have unique user id for element
//TODO: to define model for user and book

exports.getDocuments = (user, req,res,next) => {
    collection.findOne({userid: user.userid}, (err,data)=>{
        if (err) { return res.status(404).send() }
        documents = data.documents.map((document)=>document.name)
        res.status(200).send(data.documents)
    })
}

exports.addDocument = (user, req,res,next) => {
    let newItem = {
        "name": req.body.name,
        "author": req.body.author
    }
    collection.updateOne({userid: user.userid}, 
                        {'$push': {'documents': newItem}}, 
                        (err, item) => {
                            if (err) { return res.status(404).send() }
                            res.status(200).send('document updated')
                        })

}

exports.deleteDocument = (user, req,res,next) => {
    collection.updateOne({userid: user.userid}, 
                        {'$pull': {'documents': { 'name' : req.body.name}}}, 
                        (err, item) => {
                            if (err) { return res.status(404).send }
                            res.status(200).send('document deleted')
                        })

}

