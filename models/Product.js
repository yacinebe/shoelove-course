const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

productSchema = new Schema ({

    name: {type: String, required: true},
    ref : {type: String, required: true, unique:true},
    sizes : {type: String, required: true},
    description : {type: String, required: true},
    price : {type: Number, required: true},
    category : {type: String, enum: ["men", "women", "kids"]},
    id_tags : {type: Schema.Types.ObjectId , ref: "tagModel"},

});

productModel = mongoose.model ("productModel", productSchema);
module.exports = productModel;
