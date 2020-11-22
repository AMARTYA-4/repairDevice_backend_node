var express=require("express");
var router=express.Router();
var mongoose=require("mongoose");

var DeviceType=mongoose.model("DeviceType");
var Classification=mongoose.model("Classification");

var Model=mongoose.model("Model");
var Color=mongoose.model("Color");

var Service=mongoose.model("Service");


router.post("/addDevice",(req,res)=>{
    console.log(req.body);
    console.log("now");
    const {name,picture}=req.body;
    const device=new DeviceType({
        name,
        picture
    })
    device.save().then((result)=>{
        res.json(result)
    }).catch(err=>{
        console.log(err);
    })
})
router.post("/addClassification",(req,res)=>{
    console.log(req.body);
    console.log("now");
    const {name,picture,parentDeviceName}=req.body;
    
    const classification=new Classification({
        name,
        picture
    })
    classification.save()
    .then((result)=>{
            DeviceType.findOneAndUpdate({name:parentDeviceName},{
                $push:{subClassifications:result._id}
        })
        .then((update)=>{
            res.json({f:update})
        })
        .catch(err=>{
            console.log(err)
        })
    })
    .catch(err=>{
        res.json({err:"can't find"});
        console.log(err)
    })

})

router.post("/addModel",(req,res)=>{
    console.log(req.body);
    console.log("now model");
    const {name,picture,parentClassificationName}=req.body;
    const model=new Model({
        name,
        picture,
    })
    model.save()
    .then((result)=>{
        Classification.findOneAndUpdate({name:parentClassificationName},{
            $push:{subModels:result._id}
        })
        .then((updatecateg)=>{
            res.json({f:updatecateg})
        })
        .catch(err=>{
            console.log(err)
        })
    })
    .catch(err=>{
        res.json({err:"can't save"});
        console.log("Can not save");
    })
    
})
router.post("/addColor",(req,res)=>{
    console.log(req.body);
    console.log("now colors");
    const name=req.body.name;
    const picture=req.body.picture;
    const parentModelNames=req.body.parentModelNames;
    console.log(parentModelNames);
    const color=new Color({
        name,
        picture
    })
    color.save()
    .then((result)=>{
            parentModelNames.map(snglModel=>{
                Model.findOneAndUpdate({name:snglModel},{
                    $push:{childColors:result._id}
            }).then(updat=>{
                console.log(updat);
            })
            
        })
        res.json({done:"yes"})
    })
    .catch(err=>{
        console.log("Can not save")
    })
})
router.post("/pushColor",(req,res)=>{
    console.log(req.body);
    console.log("now colors");
    const name=req.body.name;
    const parentModelNames=req.body.parentModelNames;
    console.log(parentModelNames);
    Color.findOne({name:name})
    .then((result)=>{
            parentModelNames.map(snglModel=>{
                Model.findOneAndUpdate({name:snglModel},{
                    $push:{childColors:result._id}
            })
        })
        res.json({done:"yes"})
    })
    .catch(err=>{
        console.log("Can not save")
    })
})
router.post("/addServiceToModel",(req,res)=>{
    console.log(req.body);
    console.log("now Services");
    const name=req.body.name;
    const picture=req.body.picture;
    const possibleissues=req.body.possibleissues;

    const parentNames=req.body.parentNames;

    console.log(parentNames);
    const service=new Service({
        name,
        picture,
        possibleissues
    })
    service.save()
    .then((result)=>{
            parentNames.map(snglModel=>{
                Model.findOneAndUpdate({name:snglModel},{
                    $push:{services:result._id}
            }).then(updat=>{
                console.log(updat);
            })
            
        })
        res.json({done:"yes"})
    })
    .catch(err=>{
        console.log("Can not save")
    })
})
router.post("/addServiceToClassification",(req,res)=>{
    console.log(req.body);
    console.log("now Services");
    const name=req.body.name;
    const picture=req.body.picture;
    const possibleissues=req.body.possibleissues;

    const parentNames=req.body.parentNames;

    console.log(parentNames);
    const service=new Service({
        name,
        picture,
        possibleissues
    })
    service.save()
    .then((result)=>{
            parentNames.map(snglModel=>{
                Classification.findOneAndUpdate({name:snglModel},{
                    $push:{services:result._id}
            }).then(updat=>{
                console.log(updat);
            })
            
        })
        res.json({done:"yes"})
    })
    .catch(err=>{
        console.log("Can not save")
    })
})
router.post("/addServiceToDevice",(req,res)=>{
    console.log(req.body);
    console.log("now Services");
    const name=req.body.name;
    const picture=req.body.picture;
    const possibleissues=req.body.possibleissues;

    const parentNames=req.body.parentNames;

    console.log(parentNames);
    const service=new Service({
        name,
        picture,
        possibleissues
    })
    service.save()
    .then((result)=>{
            parentNames.map(snglModel=>{
                DeviceType.findOneAndUpdate({name:snglModel},{
                    $push:{services:result._id}
            }).then(updat=>{
                console.log(updat);
            })
            
        })
        res.json({done:"yes"})
    })
    .catch(err=>{
        console.log("Can not save")
    })
})



// router.post("/createProduct",(req,res)=>{
//     console.log(req.body.details);
//     console.log("now");
//     const {name,mainpic,detailpic,price,actualPrice,companyname,description,mycategoryname,mysubcategory}=req.body.details;
//     console.log(name);
//     console.log(mainpic);
//     console.log(detailpic);
//     console.log(price);
//     console.log(actualPrice);
//     console.log(companyname);
//     console.log(description);
//     console.log(mycategoryname);
//     console.log(mysubcategory)

//     const prdct=new Product({
//         name,mainpic,detailpic,price,actualprice:actualPrice,companyname,description,category:mycategoryname,subcategory:mysubcategory
//     });
//     prdct.save()
//         .then(result=>{
//             console.log(result);
//             SubCategory.findOneAndUpdate({subname:mysubcategory},{
//                 $push:{items:result._id}
//             })
//             .then((updatecateg)=>{
//                 res.json({f:updatecateg})
//             })
//             .catch(err=>{
//                 console.log(err)
//             })   
//         })
//         .catch(err=>{
//             console.log(err);
//         })
// })
router.get("/allDeviceTypes",(req,res)=>{
    DeviceType.find()
    .populate("subClassifications","name picture subModels")
    .then(categs=>{
        res.json({categs})
    })
    .catch(err=>{
        console.log(err)
    })
})
router.post("/ClassificationByDevice",(req,res)=>{
    console.log(req.body.name)
    DeviceType.findOne({name:req.body.name})
    .populate("subClassifications","name picture subModels")
    .then(categ=>{
        res.json({categ})
    })
    .catch(err=>{
        console.log(err)
    })
})
router.post("/ModelByClassification",(req,res)=>{
    console.log(req.body.name)
    Classification.findOne({name:req.body.name})
    .populate("subModels","name picture childColors")
    .then(categ=>{
        res.json({categ})
    })
    .catch(err=>{
        console.log(err)
    })
})
router.post("/colorByModel",(req,res)=>{
    console.log(req.body.name)
    Model.findOne({name:req.body.name})
    .populate("childColors","name picture")
    .then(categ=>{
        res.json({categ})
    })
    .catch(err=>{
        console.log(err)
    })
})
router.post("/colorByModel",(req,res)=>{
    console.log(req.body.name)
    Model.findOne({name:req.body.name})
    .populate("childColors","name picture")
    .then(categ=>{
        res.json({categ})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.post("/allServiceOfDevice",(req,res)=>{
    console.log(req.body.name)
    DeviceType.findOne({name:req.body.name})
    .populate("services","name picture possibleissues")
    .then(categ=>{
        res.json({categ})
    })
    .catch(err=>{
        console.log(err)
    })
})
router.post("/allServiceOfClassification",(req,res)=>{
    console.log(req.body.name)
    Classification.findOne({name:req.body.name})
    .populate("services","name picture possibleissues")
    .then(categ=>{
        res.json({categ})
    })
    .catch(err=>{
        console.log(err)
    })
})
router.post("/allServiceOfModel",(req,res)=>{
    console.log(req.body.name)
    Model.findOne({name:req.body.name})
    .populate("services","name picture possibleissues")
    .then(categ=>{
        res.json({categ})
    })
    .catch(err=>{
        console.log(err)
    })
})
// router.get("/allSubCategories",(req,res)=>{
//     SubCategory.find()
//     .populate("items","name mainpic price actualprice companyname")
//     .then(subcategs=>{
//         res.json({subcategs})
//     })
//     .catch(err=>{
//         console.log(err)
//     })
// })
// router.get("/indivSubCategory/:id",(req,res)=>{
//    console.log(req.params.id)
//     SubCategory.findById(req.params.id)
//     .populate("items","_id name mainpic price actualprice companyname")
//     .then(indivsubcateg=>{
//         res.json({indivsubcateg})
//     })
//     .catch(err=>{
//         console.log(err)
//     })
// })
// router.get("/indivSubCategorybyName/:name",(req,res)=>{
//     const subName=req.params.name;
//     console.log(subName)
//      SubCategory.findOne({subname:subName})
//      .populate("items","_id name mainpic price actualprice companyname")
//      .then(indivsubcateg=>{
//          res.json({indivsubcateg})
//      })
//      .catch(err=>{
//          console.log(err)
//      })
//  })

// router.get("/indivItem/:id",(req,res)=>{
//     console.log(req.params.id)
//      Product.findById(req.params.id)
//      .then(indivItem=>{
//          res.json({indivItem})
//      })
//      .catch(err=>{
//          console.log(err)
//      })
//  })


module.exports=router;