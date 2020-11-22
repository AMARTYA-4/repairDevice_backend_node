const mongoose=require("mongoose");
const {ObjectId}=mongoose.Schema.Types;

const DeviceTypeShema=new mongoose.Schema({
        name:{
            type:String
        },
        picture:{
            type:String
        },
        subClassifications:[{
            type:String,
            ref:"Classification"
        }],
        services:[{
            type:ObjectId,
            ref:"Service"
        }]
})

mongoose.model("DeviceType",DeviceTypeShema)