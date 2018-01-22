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


Trail Making;

```
curl -X POST -H "Content-Type: application/json" -d "{'Type':'Trail Making', 'Name':'Trail Making in French', 'Instructions':'Instructions In French', 'TrailA':['A','B','C','D','E'], 'TrailB':['A','1','B','2','C','3']}" "localhost:5000/Localisation/en_gb/5"
```

### Retrieving Data

Not Yet fully implemented, the endpoint for retrieving data is the same as posting, but with as  a GET request

the end point takes the form of;

```
localhost:5000/Localisation/{PresetName}/{TestType}
```

Where `{PresetName}` is the Name of the localisation preset being retrieved. and `{TestType}` is the numeric code for the test whos data you want.

```
dot_cancellation : 1,
compass_directions : 2,
car_directions : 3,
road_sign_scenarios : 4,
trail_making : 5
```

Dot Cancellation Test:

Example Curl
```
curl -X GET -H "Content-Type: application/json" "localhost:5000/Localisation/en_gb/1"
```

Example response
```
{
    'PresetName':'en_gb',
    'Name':'Dot Cancellation In French',
    'Instructions':'Instructions in French'
}
```


## Creating A Participant.

Creating a new participant involves one step.

A POST request to: `localhost:5000/Participant/Create`

An Example Curl:
```
curl -X POST -H "Content-Type: application/json" -d "{}" "localhost:5000/Participant/Create"

```
It returns the `participant ID of the newly created participant. `

Example response:
```
{"participantId":1}
```

## Creating A Participant's Test

Creating a new Test for a participant involves one step.

A POST request to: `localhost:5000/Participant/Create/Test`

In the body you will be required to send the details necessary for test creation in the following format:

```
{
    'ParticipantId' : 1,     // sub 1 for whatever you participant's id is
    'ClinicianId' : 1,       // sub 1 for whatever your clinician id is
    'LocalePreset' : 'en_gb' //sub en_gb for whatever you locale preset name is
}
```

An Example Curl
```
curl -X POST -H "Content-Type: application/json" -d "{'ParticipantId':1, 'ClinicianId':1, 'LocalePreset':'en_gb'}" "localhost:5000/Participant/Create/Test"
```
2
