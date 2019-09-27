

exports.getDocuments = (user, req,res,next) => {
    collection.findOne({userid: user.userid}, (err,data)=>{
        if (err) { return res.status(404).send() }
        documents = data.documents.map((document)=>document.name)
        res.status(200).send(data.documents)
    })
}

//TODO: t/s document update doesn't work
exports.addDocument = (user, req,res,next) => {
    collection.updateOne({userid: user.userid}, 
                        {'$set': {'userid': '102'}}, 
                        (err, item) => {
                            console.log(item)
                            res.status(200).send('document updated')
                        })

}