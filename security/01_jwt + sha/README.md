# Step to create secured login in node server

## Step 1 - Register
The user sends to the server a new user object:
* The password is converted in the client side to `sha256`
* When we save the new user in the DB, we save a hashed password


## Step 2 - login
The user enters in the client side a name and a password
* The password is converted in the client side to `sha256`
* The server gets an object that contains a name and a hashed password - and checks in the DB if we have a matching user

## Step 3
If the user exists in the DB, the server will craete a token and send it back to the client   
Every token is created from this parts:
    * `User data` - the name and the password that the user sent in the request
    * `Secret` - a string that is defined in the server side, and is used to hash the user data and create a new token

```javascript
const jwt = require('jsonwebtoken');
const {SHA256} = require('crypto-js');

var data = {
 password: SHA256("1234").toString(),
 name:"Bob"
};

var token = jwt.sign(data, 'my secret');
console.log(token);
```

## Step 4
The token that was created in step 3, is passed to the user in the response

## Step 5
The client will save the token that he got from the server, and will add this token to the header of all the coming requests

## Step 6
The server gets the request with the token, and can decode the token with the secret that encoded the token.
```javascript
var decoded = jwt.verify(token, 'my secret');
console.log('decoded', decoded);
```









