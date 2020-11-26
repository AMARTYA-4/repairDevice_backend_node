const express = require("express");
const bodyParser = require('body-parser');
var mongoose=require("mongoose");
var cors = require('cors');

const app = express();
const port = process.env.PORT || "8000";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.use(cors());
require("./Schema/DeviceType");
require("./Schema/Classification");
require("./Schema/Model");
require("./Schema/Color");
require("./Schema/issue");

const mongoURI="YOUR SPECIAL SETUP CLUSTER URL OF MONGO DB ATLAS"

mongoose.connect(mongoURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify: false 
})
mongoose.connection.on("connected",()=>{
    console.log("Yeah !!!!,I have Successfully connected with Mongodb Atlas")
})
mongoose.connection.on("error",(err)=>{
    console.log("Error",err)
})


var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({    //fror link your email and nodemailer
  service: 'gmail',
  secure: true,
  auth: {
    user: 'Your Email', //Your Email Address
    pass: 'Your Password'      //Your Password
  }
  
});

app.post("/sendmail", (req, res) => {
  console.log(req.body);
  var clientdata = req.body.clientDetails;

  var mailOptions = {
    to: ['amartyasarkar0001@gmail.com'],  //give here the main Email where you want to revieve emails of your clients
    from: 'amartyasarkar0001@gmail.com',
    subject: clientdata.name,
    text:` New client Posted a Job For You.Details are here:
          Email: ${clientdata.email}
          Phone no : ${clientdata.phone}
          Name : ${clientdata.fullname}
          Divice Type:${req.body.diviceType}
          Classification:${req.body.classification}
          Model:${req.body.model}
          color:${req.body.color}
          issue:${req.body.issue?req.body.issue:"Undefined"}
          Extra Inquary:${req.body.inquaryInput}
          `,
    phone: clientdata.phone
  };
  var mailOptionsClient = {
    to: [clientdata.email],   //the clients email ,and An email of Successfull Inqury will be send to here
    from: 'amartyasarkar0001@gmail.com', 
    subject: clientdata.name,
    text:`You have Successfully Submitted your Inquary.Details are here:
          Email: ${clientdata.email}
          Phone no : ${clientdata.phone}
          Name : ${clientdata.fullname}
          Divice Type:${req.body.diviceType}
          Classification:${req.body.classification}
          Model:${req.body.model}
          color:${req.body.color}
          issue:${req.body.issue?req.body.issue:"Undefined"}
          Extra Inquary:${req.body.inquaryInput}
          `,
    phone: clientdata.phone
  };
  console.log(mailOptions);
  transporter.sendMail(mailOptions, function (error, info) { //send to your Email
    if (error) {
      console.log("Error occured");
      res.json({error:"Check Your Email address",send:false})
    } else {
      transporter.sendMail(mailOptionsClient, function (error, info) { //send to clients email
      if(error){
        console.log("Error occured in Client mail send");
        res.json({error:"Check Your Email address",send:false})
      }else{
        res.json({message:"your Inquary successfully Posted ,Our Experts will contact with you soon",FullDetails:req.body,send:true})  //this will send to your frontend react app
      }
      
      })
    }
  });
})

app.use(express.json());
app.use(require("./routes/handling"));


app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
