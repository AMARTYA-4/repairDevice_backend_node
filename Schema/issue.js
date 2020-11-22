const mongoose=require("mongoose");

const ServiceSchema=new mongoose.Schema({
        name:{
            type:String
        },
        picture:{
            type:String
        },
        possibleissues:[{
            type:String
        }]
    })
mongoose.model("Service",ServiceSchema);