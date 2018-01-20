# Stroke Drivers Screen Assessment 

This directory is for all API/System Logic implementation.

This will include .NET implementation of the REST API

# The project has now been updated to .net core sdk 2.0.2 
### There are significant changes how to build/run and the new sdk will need to be installed
Instuctions for installing .net core sdk 2.0.2 as well as instuction on  how to run the updated project on Ubuntu can be found [here](https://www.microsoft.com/net/learn/get-started/linuxubuntu)


## Authentication

Token Based authentication is used in this implementation.

Login with Email and Password to recieve a token.

Any requests must be made with the token.

Example Curl:
```
curl -X POST -H "Content-Type: application/json" -d "{'Email':'clinician@sdsa.com', 'password':'password', 'UserType':1}" "localhost:5000/login"

```
