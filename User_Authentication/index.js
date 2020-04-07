const firebase = require('firebase');
const express = require('express');
const Eureka = require('eureka-client').Eureka;

const port = 8081;
const req = express();
req.use(express.json()) // for parsing application/json
req.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const client = new Eureka({
    // application instance information
    instance: {
      app: 'user-registration-service',
      hostName: 'localhost',
      ipAddr: '127.0.0.1',
      port: {
        '$': 3000,
        '@enabled': true,
      },
      vipAddress: 'user-registration-service',
      dataCenterInfo: {
        '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
        name: 'MyOwn',
      },
    },
    eureka: {
        host: 'localhost',
	    port: 8761,
	    servicePath: '/eureka/apps/'
    },
  });

const firebaseConfig = {
    apiKey: "AIzaSyDh7Cj2YAfB9LrvoqSJ6qg2ra4GrSC-nzk",
    authDomain: "userauthentication-3f6d3.firebaseapp.com",
    databaseURL: "https://userauthentication-3f6d3.firebaseio.com",
    projectId: "userauthentication-3f6d3",
    storageBucket: "userauthentication-3f6d3.appspot.com",
    messagingSenderId: "387168077401",
    appId: "1:387168077401:web:334155ba67a57029301348"
  }

  const app = firebase.initializeApp(firebaseConfig);


req.post('/registeruser',(request,response)=>{
    let body = request.body;
    let email = body.email;
    let password = body.password;
    firebase.auth().createUserWithEmailAndPassword(email, password).then(()=>{

        let data = {
            "status":201,
            "message":"user successfully created"
        }
        response.status(201).send(data);
        }
    )
    .catch((err)=>{
        let errCode = err.code;
        let errMessage=err.message;
        let data = {
            "status":500,
            "message":errMessage
        }
        response.status(404).send();
    })
})
req.listen(3000,()=>console.log('listening at port '+port));
client.start(); 