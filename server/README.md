# Server README

This directory is for all API/System Logic implmentation.

This will include .NET implmentations of the REST API.


*Stroke Drivers Application RESTapi*
----


## Clinician API


Root: /c/
Re-roots: clincians, admin

**Login Procedure**
* **URL**
    /login
* **Method:** 
    `POST`
*  **URL Params**
   **Required:**
   `Oauth=[json]`
* **Data Params**
  TODO: WHAT OAuth looks like here
* **Success Response:**
  * **Code:** 200 <br />
    **Content:** `{ token : x }`
* **Error Response:**
  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Log in" }`
  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ error : "User Invalid" }`
* **Example:**
  /assement
* **Notes:**
  Must be pre-registered before can login

**Register New Participant**
* **URL**
  /register_participant
* **Method:**
  `POST`
*  **URL Params**
    None
* **Data Params**
    OAuth_token?
* **Success Response:**
  * **Code:** 200 <br />
    **Content:** `{ participant_id : x }`
* **Error Response:**
  None

**Partcipant Test Results**
* **URL**
  /<participant_id>/results
* **Method:**
  `GET`
*  **URL Params**
   **Optional:**
   `dot_cancellation=[string]`
   `car_directions=[string]`
   `compass_directions=[string]`
   `road_scenarios=[string]`
   `trail_making=[string]`
* **Data Params**
  OAuth_token?
* **Success Response:**
  * **Code:** 200 <br />
    **Content:**               `{defualt: { tests: [dot_cancellation,car_directions,compass_directions,road_scenarios,trail_making]}}`
    ***dot_cancellation:**     `{time_taken: x, true_pos: x, false_pos: x, false_neg: x}`
    ***car_directions:**       `{time_taken: x, points: x}`
    ***compass_directions:**   `{time_taken: x, points: x}`
    ***road_scenarios:**       `{time_take: x, points: x}`
    ***trail_making:**         `{time_take: x, mistakes: x}`

* **Error Response:**
 * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ error : "Participant is a invalid id" }`
* **Notes:**
    If you would like data on all participants ids iterate these requests for each. This is done seprately for security 

**Participant Settings**
* **URL**
  /<participant_id>/localisation_presents
* **Method:**
  `GET`
*  **URL Params**
   **Optional:**
   `settings={json}`
* **Data Params**
  OAuth_token?
* **Success Response:**
  * **Code:** 200 <br />
    **Content:**               `{}`

* **Error Response:**
 * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ error : "Participant is a invalid id" }`
* **Notes:**
    If you would like data on all participants ids iterate these requests for each. This is done seprately for security 

**Partcipant Settings**
* **URL**
  /results/<participant_id>/
* **Method:**
  `GET`
*  **URL Params**
   **Optional:**
   `settings={json}`
* **Data Params**
  OAuth_token?
* **Success Response:**
  * **Code:** 200 <br />
    **Content:**               `{}`

* **Error Response:**
 * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ error : "Participant is a invalid id" }`
* **Notes:**
    If you would like data on all participants ids iterate these requests for each. This is done seprately for security 

**Upload Data**
* **URL**
  /upload/<test_name>
* **Method:**  
  `POST`
*  **URL Params**
   **Optional:**
   `test_data_setting={json}`
* **Data Params**
    OAuth_token?
* **Success Response:** 
  * **Code:** 200 <br />
    **Content:** `{  }`
    //TODO: error codes for following
  * **Code:**  <br />
    **Content:** `{ invalid already existing data }`
  * **Code:**  <br />
    **Content:** `{  }`
* **Error Response:**
  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ error : "Test name is a valid test, please try {test_names}" }`







##Participant

Root: /p/
Re-routers: participant


**Send Test Data**

**Send Dot Cancellation**
* **URL**
  /tests/dot_cancellation
* **Method:**  
  `POST`
*  **URL Params**
   **Required:**
   test_data=`{time_taken: x, true_pos: x, false_pos: x, false_neg: x}`
* **Data Params**
    OAuth_token?
* **Success Response:** 
  * **Code:** 200 <br />
    **Content:** `{  }`
* **Error Response:**
  * **Code:**  <br />
    **Content:** `{ error : "this is incorrectly formatted test data" }`

**Send Dot Cancellation**
* **URL**
  /tests/car_directions
* **Method:**  
  `POST`
*  **URL Params**
   **Required:**
   test_data=`{time_taken: x, points: x}`
* **Data Params**
    OAuth_token?
* **Success Response:** 
  * **Code:** 200 <br />
    **Content:** `{  }`
* **Error Response:**
  * **Code:**  <br />
    **Content:** `{ error : "this is incorrectly formatted test data" }`

**Send Dot Compass Directions**
* **URL**
  /tests/car_directions
* **Method:**  
  `POST`
*  **URL Params**
   **Required:**
   test_data=`{time_taken: x, points: x}`
* **Data Params**
    OAuth_token?
* **Success Response:** 
  * **Code:** 200 <br />
    **Content:** `{  }`
* **Error Response:**
  * **Code:**  <br />
    **Content:** `{ error : "this is incorrectly formatted test data" }`

**Send Dot Compass Road Scenarios**
* **URL**
  /tests/road_scenarios
* **Method:**  
  `POST`
*  **URL Params**
   **Required:**
   test_data=`{time_taken: x, points: x}`
* **Data Params**
    OAuth_token?
* **Success Response:** 
  * **Code:** 200 <br />
    **Content:** `{  }`
* **Error Response:**
  * **Code:**  <br />
    **Content:** `{ error : "this is incorrectly formatted test data" }`

**Send Dot Compass Trail Making**
* **URL**
  /tests/trail_making
* **Method:**  
  `POST`
*  **URL Params**
   **Required:**
   test_data=`{time_taken: x, points: x}`
* **Data Params**
    OAuth_token?
* **Success Response:** 
  * **Code:** 200 <br />
    **Content:** `{  }`
* **Error Response:**
  * **Code:**  <br />
    **Content:** `{ error : "this is incorrectly formatted test data" }`

**Gather Participant Localisation Presets**
* **URL**
  /test/<test_name>localisation_preset
* **Method:**
  `GET`
*  **URL Params**
    None
* **Data Params**
    OAuth_token
* **Success Response:**
  * **Code:** 200 <br />
    **Content:** `{ localisation_presents }`
* **Error Response:**
  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ error : "Email Invalid" }`



