const mongoose=require("mongoose")
const {ObjectId}=mongoose.Schema.Types;

const ModelSchema=new mongoose.Schema({
        name:{
            type:String
        },
        picture:{
            type:String
        },
        childColors:[{
            type:ObjectId,
            ref:"Color"
        }],
        services:[{
            type:ObjectId,
            ref:"Service"
        }]
    })
mongoose.model("Model",ModelSchema);