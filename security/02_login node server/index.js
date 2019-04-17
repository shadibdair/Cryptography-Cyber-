// Requires:
const express = require("express");
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');

const userArr = [];

// Create express app:
const app = express();

// Use middlewares - parse request's body to json:
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Add client - REGISTER: 
app.post("/api/client", (request, response) => {
    let client = request.body;
    userArr.push(client);  // the array is demo of DB 

    let token = jwt.sign({ id: client.userName }, 'my secret')
    response.header('xx-auth', token);
    response.status(201).send();

});

// Get client -LOGIN: 
app.get("/api/client", (request, response) => {
    let loginData = request.header('xx-auth');
    if (loginData) {

        //check in the array of all the users - if we have a matching user
        let client = userArr.find(e =>
            e.password == loginData.substring(0, 64) &&
            e.userName == loginData.substring(64, loginData.length)
        )

        // if we found a matching client - we send a token back
        if (client) {
            let token = jwt.sign({ id: client.userName }, 'my secret')
            response.header('xx-auth', token);
            response.status(200).send(JSON.stringify({ "status": "login success" }));
        }

        // if we didnt find a matching client - we send code 401
        else {
            response.status(401).send();
        }
    }
    // if we do not have any content in the 'xx-auth' header
    else {
        response.status(401).send();
    }
});


// GET request - that we want that only non-anonymous client will access 
app.get("/api/info", (request, response) => {
    let token = request.header('xx-auth');

    if (token) {
        try {
            var decoded = jwt.verify(token, 'my secret');
            
            //refresh the token
            let newToken = jwt.sign({ id: decoded.id }, 'my secret')
            response.header('xx-auth', newToken);
            
            response.status(200).send(`hello ${decoded.id}`);

        }
        catch (e) {
            response.status(401).send();
        }
    }
    // if we do not have any content in the 'xx-auth' header
    else {
        response.status(401).send();
    }

})


app.listen(process.env.PORT || 8800, () => { console.log(`server listening`); });