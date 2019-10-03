
//TODO: to crate authentication for admin

exports.getDocuments = (user, req,res,next) => {
    collection.findOne({_id: user._id}, (err,data)=>{
        if (err) { return res.status(404).send() }
        documents = data.documents.map((document)=>document.title)
        res.status(200).send({documents: documents})
    })
}

exports.addDocument = (user, req,res,next) => {
    if (req.body.title){
        let newItem = {
            "title": req.body.title,
            "content": typeof req.body.content === 'undefined'? "":  req.body.content
        }
        //checking if document with the same name exist.
        collection.findOne({_id: user._id}, (err,data)=>{
            if (err) { return res.status(404).send() }
            requestedDoc = data.documents.filter((doc)=>doc.title==req.body.title)

            if(requestedDoc.length===0){
                collection.updateOne({_id: user._id}, 
                    {'$push': {'documents': newItem}}, 
                    (err, item) => {
                        if (err) { return res.status(404).send({message: err}) }
                        return res.status(201).send({message: req.body.title+" created"})
                    })
            }
            else{
                return res.status(403).send({message: req.body.title+" exists. To update same document, use /PATCH request"})
            }
        })
    }
    else { return res.status(400).send("All arguments must be provided.") }
}


exports.deleteDocument = (user, req,res,next) => {
    collection.updateOne({_id: user._id}, 
                        {'$pull': {'documents': { 'title' : req.body.title}}}, 
                        (err, item) => {
                            if (err) { return res.status(404).send() }
                            res.status(200).send(req.body.title+' deleted')
                        })

}

exports.updateDocument = (user, req,res,next) => {
    collection.updateOne({_id: user._id, 'documents.title':req.body.title}, 
                        {$set: {'documents.$.content':req.body.content}}, 
                        (err, item) => {
                            if (err) { return res.status(404).send(err) }
                            return res.status(200).send({message: req.body.title+" updated"})
                        })
}

//get specific document
exports.getDocument = (user, req,res,next) => {
    collection.findOne({_id: user._id}, (err,data)=>{
        if (err) { return res.status(404).send() }
        requestedDoc = data.documents.filter((doc)=>doc.title==req.body.title)
        if(requestedDoc.length===0){ return res.status(404).send ({message: "Document not found"}) }
        return res.status(200).send({content: requestedDoc[0].content})
    })
}