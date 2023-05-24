const mailchimp = require("@mailchimp/mailchimp_marketing");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const request = require("request");
const https = require("https");

mailchimp.setConfig({
  apiKey: "<50ad8717e8f0a2ca019bdb4772b1ec1a-us21>",
  server: "<us21>"
});

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});


app.post("/", (req, res) => {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const apiKey = '50ad8717e8f0a2ca019bdb4772b1ec1a-us21';
    const listId = '9fab946a9a';
    const dataCenter = apiKey.split('-')[1];
    const url = `https://${dataCenter}.api.mailchimp.com/3.0/lists/${listId}/members`;

    const options = {
        method: 'POST',
        url,
        headers: {
            'Authorization': `apikey ${apiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email_address: email,
            status: 'subscribed',
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        })
    };

  request(options, function (error, response, body) {
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html")
        }
        else{
          res.sendFile(__dirname + "/failure.html")
        }
    });


});

app.post("/failure", function(req, res){
  res.redirect("/")
});


  app.post("/failure", function(req,res){
      res.redirect("/");
  });

  app.listen(process.env.PORT || 3000, function(req,res){
      console.log("Server is up and Running!!");
  });
