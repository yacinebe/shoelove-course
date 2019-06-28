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

    getOne(data_id, clbk){
        this.model.findOne
        (data_id)
            .then(res => clbk(res))
            .catch(err => console.log(err))

    }

    getAll( clbk ){
        this.model.find({})
            .then(res =>  clbk(res))
            .catch(err => console.log(err))
    }

    filter(field, value, clbk){
        const filterObject={}
        filterObject[field]=value
        this.model.find(filterObject)
            .then( res => { clbk(res)})
            .catch(err => console.log(err))
    }

    updateOne(filterObject, data, clbk){

        console.log( "data ---", data)
        console.log("filterObject ---", filterObject)
        this.model.findByIdAndUpdate(filterObject, data)
            .then(res => {console.log(res); clbk(res)})
            .catch(err => console.log(err))
    }


    deleteOne(data, clbk){
        this.model.findByIdandRemove(data.id)
            .then(res => {clbk(res)})
            .catch(err => console.log(err))
    }
            
}



module.exports=CRUDHandler;