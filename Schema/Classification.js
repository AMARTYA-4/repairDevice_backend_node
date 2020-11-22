const mongoose=require("mongoose")
const {ObjectId}=mongoose.Schema.Types;

const ClassificationShema=new mongoose.Schema({
        name:{
            type:String
        },
        picture:{
            type:String
        },
        subModels:[{
            type:ObjectId,
            ref:"Model"
        }],
        services:[{
            type:ObjectId,
            ref:"Service"
        }]
    })
mongoose.model("Classification",ClassificationShema);