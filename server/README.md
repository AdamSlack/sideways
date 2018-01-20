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

## Localisation

### Sending Data

Sending Data is done though a Post request to:

```
    localhost:5000/Localisation/{Locale Name}/{Test type}
```

Where `{Locale name}` is the name of the localisation preset and `{test type}` is the type of test it is (dot cancellation, etc...)


Example Curl Request to Post Data:

Dot Cancellation:
```
curl -X POST -H "Content-Type: application/json" -d "{'Type':'Dot Cancellation', 'Name':'Dot Cancellation in French', 'Instructions':'Instructions In French'}" "localhost:5000/Localisation/en_gb/1"
```

Compass Directions:
```
curl -X POST -H "Content-Type: application/json" -d "{'Type':'Compass Directions', 'Name':'Compass Directions in French', 'Instructions':'Instructions In French', 'HeadingsLabel':'Headings Label In French', 'DeckLabel':'Deck Label In French'}" "localhost:5000/Localisation/en_gb/2"

```

Car Directions:
curl -X POST -H "Content-Type: application/json" -d "{'Type':'Car Directions', 'Name':'Car Directions in French', 'Instructions':'Instructions In French', 'HeadingsLabel':'Headings Label In French', 'DeckLabel':'Deck Label In French'}" "localhost:5000/Localisation/en_gb/3"

