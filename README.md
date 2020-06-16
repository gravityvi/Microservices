# Microservices
Creating Multiple micro-services in different framework and integrating them in Eureka discovery server.

## About
This project was created to learn how microservice architecture works. One of the advantage of microservice is you can use different tech stack across the project.
In this project I have used spring and node(expressJS) and they work together with a discovery server sitting in between them. I have taken a example where the application needs to register a user using firebase.
I have tackled this problem using following architecture: 
- Spring exposes api to create a user.
- In the logic spring actually hits node server through discovery server to create user takes the response back from node.
- supply the response which spring got from node to user.
## Features
- Register a new user
- Login a user

