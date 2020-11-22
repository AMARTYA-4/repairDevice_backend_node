const mongoose=require("mongoose")
const {ObjectId}=mongoose.Schema.Types;

const ColorSchema=new mongoose.Schema({
        name:{
            type:String
        },
        picture:{
            type:String
        }
    })
mongoose.model("Color",ColorSchema);