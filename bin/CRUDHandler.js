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
            .then (dbres => console.log ("creating document seems to be working"))
            .catch (err => console.log("this is not working :", err))     
    }

    getOne(){}

    getAll( clbk ){
        this.model.find({})
            .then(res =>  clbk(res))
            .catch(err => console.log(err))
    }

    filter(field, value, clbk){
        const filterObject={}
        filterObject[field]=value
        this.model.find(filterObject)
            .then( res => {console.log(res); clbk(res)})
            .catch(err => console.log(err))
    }

    updateOne(){}

    deleteOne(){}
            
}

module.exports=CRUDHandler;