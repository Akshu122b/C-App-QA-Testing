const express = require("express");

const EventRoute = express.Router();
const {CreateEvent,GetEventRoute, GetUserEvent,  UpdateEvent,  DeleteEvent} = require("../controller/EventController")


const eventroute = require('../controller/EventController');

EventRoute.post('/create-event', CreateEvent);
EventRoute.get('/get-events', GetEventRoute);
EventRoute.get('/getuserevent/:id',GetUserEvent);
EventRoute.put('/update-event/:id', UpdateEvent);
EventRoute.delete('/delete-event/:id', DeleteEvent);





// EventRoute.put('/update-event', UpdateEvent);

module.exports = EventRoute;