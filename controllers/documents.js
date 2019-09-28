//TODO: to have unique user id for docuemnts
//TODO: to define models for user and documents
//TODO: to crate entry for admin

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
                            if (err) { return res.status(404).send() }
                            res.status(200).send('document deleted')
                        })

}

exports.updateDocument = (user, req,res,next) => {
    collection.updateOne({userid: user.userid, 'documents.name':req.body.name}, 
                        {$set: {'documents.$.author':req.body.author}}, 
                        (err, item) => {
                            if (err) { return res.status(404).send(err) }
                            res.status(200).send('document updated')
                        })
}

//get specific document
exports.getDocument = (user, req,res,next) => {
    collection.findOne({userid: user.userid}, (err,data)=>{
        if (err) { return res.status(404).send() }
        requestedDoc = data.documents.filter((doc)=>doc.name==req.body.name)
        res.status(200).send(requestedDoc)
    })
}