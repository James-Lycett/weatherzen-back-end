# WeatherZen API
RESTful API for recording weather observations. Performs GET, POST, and PUT functions for observations.

## Link
https://weatherzen-frontend.onrender.com/

## How to Use:
### GET Requests
Sending a GET request to https://weatherzen-frontend.onrender.com/ will return a list of all recorded observations, in order of observation id.
Sending a GET request to https://weatherzen-frontend.onrender.com/edit/:observationId,  where :observationId is the id of a specific observation, will return that observation only
<br/>

### POST Requests
Will save the observation and respond with the newly created observation


POST request body must have the following format:
<br>{
  <br>&nbsp;&nbsp;"data": {
    <br>&nbsp;&nbsp;&nbsp;&nbsp;"latitude": integer > -180 && < 180,
    <br>&nbsp;&nbsp;&nbsp;&nbsp;"longitude": integer > -180 && < 180",
    <br>&nbsp;&nbsp;&nbsp;&nbsp;"sky_condition": "string",
    <br>&nbsp;&nbsp;&nbsp;&nbsp;"air_temperature_unit": "string" = "F" || "C",
    <br>&nbsp;&nbsp;&nbsp;&nbsp;"air_temperature": integer > -60F (or -40C) && < 224F (or 107C)
  <br>&nbsp;&nbsp;}
<br>}

### PUT Requests
Will update an existing observation.
Only allowed at https://weatherzen-frontend.onrender.com/edit/:observationId

PUT request body must have the same format as POST requests

## Technologies Used
Node.js, Express.js, Knex.js, PostgreSQL
