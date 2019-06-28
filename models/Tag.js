const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

tagSchema = new Schema ({

    label: {type: String, enum: ["coolandtrendy", "vintage", "converse", "athletic"], unique:true}

});

tagModel = mongoose.model ("tagModel", tagSchema);
module.exports = tagModel;
