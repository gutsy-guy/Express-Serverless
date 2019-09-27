

exports.getDocuments = (user, req,res,next) => {
    collection.findOne({userid: user.userid}, (err,data)=>{
        if (err) { return res.status(404).send() }
        documents = data.documents.map((document)=>document.name)
        res.status(200).send(data.documents)
    })
}

//TODO: t/s document update doesn't work
exports.addDocument = (user, req,res,next) => {
    console.log(user)
    let newItem = {
        "name": req.body.name,
        "author": req.body.author
    }
    collection.updateOne({userid: user.userid}, 
                        {'$push': {'documents': newItem}}, 
                        (err, item) => {
                            console.log(item)
                            res.status(200).send('document updated')
                        })

}