const express=require('express');
const request=require('request');
const bodyParser=require('body-parser');
const https=require('https');
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/", function(req, res){
    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;

    const data={
        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName
                }
            }
        ]
    };
    const jasondata=JSON.stringify(data);
    
    const url="https://us14.api.mailchimp.com/3.0/lists/0aceb1fcd8";
    const options={
        method:"POST",
        auth:"mahak:75b2081c29291c20956ea2fee9d0092b-us14"
    }
    var request=https.request(url,options,function(response){


        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failuer.html");
        }
      response.on("data",function(data){
          console.log(JSON.parse(data));
      })  
    })

   

    request.write(jasondata);
    request.end();
    app.post("/failuer", function(req, res){
        res.redirect("/");
    })


})


app.listen(process.env.PORT || 3000, function(){
    console.log('listening on server');
});

