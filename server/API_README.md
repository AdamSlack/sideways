# SDSA RESTful API
## Clinician Endpoints
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
    **Content:** `{ participant_id : x, participant_token }`
* **Error Response:**
  None

**Partcipant Test Results**
* **URL**
  /<participant_id>/getResults
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

**Partcipant Per Test Results**
* **URL**
  /<participant_id>/<test_id>/getResults
* **Method:**
  `GET`
*  **URL Params**
   **Optional:**
   `filter=[string]`
   `sort=[]`
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
  /<participant_id>/user_details
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
  /tests/<test_name>
* **Method:**  
  `POST`
*  **URL Params**
   **Required:**
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
    **Content:** `{ error : "Test name is a valid test, please try {test_name}" }`
  * **Code:** 501 NOT IMPLEMENTED <br />
    **Content:** `{ error : "The test requested does not currently support update configurations {test_name}" }`
  * **Error Response:**
  * **Code:**  <br />
    **Content:** `{ error : "The test json configuration is incorrectly formatted please try {json format}" }`







##Participant

Root: /p/
Re-routers: participant

**Request Particpant Access**
* **URL**
    /<participant_id>
* **Method:** 
    `POST`
*  **URL Params**
   **Required:**
   `Oauth=[json]`
* **Data Params**
  TODO: WHAT OAuth looks like here
* **Success Response:**
  * **Code:** 200 <br />
    **Content:** `{ token_participan : x }`
* **Error Response:**
  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Log in unauthorised" }`
  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ error : "Cliciian Invalid" }`
* **Notes:**
  Must be pre-registered before can login


**Send Test Data**

**Send Dot Cancellation**
* **URL**
  <participant_id>/tests/dot_cancellation
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

**Send Car Directions**
* **URL**
  <participant_id>/tests/car_directions
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
  <participant_id>/tests/compass_directions
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
  <participant_id>/tests/road_scenarios
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
  <participant_id>/tests/trail_making
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
  <test_name>/localisation_preset
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



