const {SHA256} = require('crypto-js');

//------example to testing the hash--------
 const message = '123456';
 const hash = SHA256(message).toString();
 
 console.log(`Message: ${message}`);
 console.log(`Hash: ${hash}`);
 console.log(`Hash length: ${hash.length}`);



 /*
 OUTPUT:
 _____________________________________
Message: Test hash sha256
Hash: 13f635ae08cf29ca78f9d4a6b5896bcfc35d3a877164e1fa5e3678ba784be1b8
Hash length: 64
 */


