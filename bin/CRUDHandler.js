class CRUDHandler{
    constructor(model){
        this.model=model;
    }

    createOne(data){
        
        const schema=this.model["schema"]["obj"]
        const schemaKeys=Object.keys(schema)
        console.log("------------------------------")
        let newDocument={};
        schemaKeys.forEach((key) =>{newDocument[key]=data[key]})
        
        this.model.create(newDocument)
            .then (dbres => console.log ("this seems to be working and the result is " + dbres))
            .catch (err => console.log("this is not working :", err)) 
        
    }

    getOne(){}

    getAll(){}

    updateOne(){}

    deleteOne(){}
            
}

module.exports=CRUDHandler;