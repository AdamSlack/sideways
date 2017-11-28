# Server README

This directory is for all API/System Logic implmentation.

This will include .NET implmentations of the REST API.




*Stroke Drivers Application RESTapi*
----




## Clinicina API

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

**Register new participant**
* **URL**
  /request_participant
* **Method:**
  `POST`
*  **URL Params**
    None
* **Data Params**
    None
* **Success Response:**
  * **Code:** 200 <br />
    **Content:** `{ participant_id : x }`
* **Error Response:**
  None



**Partcipant Results**
* **URL**
  /results/
* **Method:**
  `GET`
*  **URL Params**
   **Required:**
   `test=[string]`
   **Optional:**
   `photo_id=[alphanumeric]`
* **Data Params**
  <_If making a post request, what should the body payload look like? URL Params rules apply here too._>
* **Success Response:**
  * **Code:** 200 <br />
    **Content:** `{ id : 12 }`
* **Error Response:**
  <_Most endpoints will have many ways they can fail. From unauthorized access, to wrongful parameters etc. All of those should be liste d here. It might seem repetitive, but it helps prevent assumptions from being made where they should be._>
  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Log in" }`
  OR
  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ error : "Email Invalid" }`
* **Sample Call:**
  <_Just a sample call to your endpoint in a runnable format ($.ajax call or a curl request) - this makes life easier and more predictable._> 
* **Notes:**
  <_This is where all uncertainties, commentary, discussion etc. can go. I recommend timestamping and identifying oneself when leaving comments here._> 




**Upload Data**
* **URL**
  /upload/
* **Method:**  
  `POST`
*  **URL Params**
   <_If URL params exist, specify them in accordance with name mentioned in URL section. Separate into optional and required. Document data constraints._> 
   **Required:** 
   `id=[integer]`
   **Optional:**
   `photo_id=[alphanumeric]`
* **Data Params**
  <_If making a post request, what should the body payload look like? URL Params rules apply here too._>
* **Success Response:** 
  <_What should the status code be on success and is there any returned data? This is useful when people need to to know what their callbacks should expect!_>
  * **Code:** 200 <br />
    **Content:** `{ id : 12 }`
* **Error Response:**
  <_Most endpoints will have many ways they can fail. From unauthorized access, to wrongful parameters etc. All of those should be liste d here. It might seem repetitive, but it helps prevent assumptions from being made where they should be._>
  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Log in" }`
  OR
  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ error : "Email Invalid" }`






**Participant**

**Partcipant Results**
* **URL**
  /results/
* **Method:**
  `GET`
*  **URL Params**
   **Required:**
   `test=[string]`
   **Optional:**
   `photo_id=[alphanumeric]`
* **Data Params**
  <_If making a post request, what should the body payload look like? URL Params rules apply here too._>
* **Success Response:**
  * **Code:** 200 <br />
    **Content:** `{ id : 12 }`
* **Error Response:**
  <_Most endpoints will have many ways they can fail. From unauthorized access, to wrongful parameters etc. All of those should be liste d here. It might seem repetitive, but it helps prevent assumptions from being made where they should be._>
  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Log in" }`
  OR
  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ error : "Email Invalid" }`
* **Sample Call:**
  <_Just a sample call to your endpoint in a runnable format ($.ajax call or a curl request) - this makes life easier and more predictable._> 
* **Notes:**
  <_This is where all uncertainties, commentary, discussion etc. can go. I recommend timestamping and identifying oneself when leaving comments here._> 

