const express = require('express');
const { model } = require("mongoose");
const Event = require('../modal/Event');
const moment = require('moment-timezone');
const userdetail = require('../modal/User')


// Create a new event
const CreateEvent = async (req, res) => {
    const { username, title, roomName, StartTime, EndTime, availability, User } = req.body;

    const startTimeIST = moment.tz(StartTime, 'YYYY-MM-DD HH:mm:ss', 'UTC').tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');
    const endTimeIST = moment.tz(EndTime, 'YYYY-MM-DD HH:mm:ss', 'UTC').tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');


    try {

        const roomExits = await Event.findOne({ availability })
        const startTimeAvailble = await Event.findOne({ StartTime })
        const endTimeAvailble = await Event.findOne({ EndTime })

        // Check if EndTime is less than StartTime
        if (new Date(EndTime) < new Date(StartTime)) {
            return res.status(400).json({ message: "EndTime cannot be less than StartTime" })
        }

        if (roomExits && startTimeAvailble && endTimeAvailble) {
            return res.status(400).json({ message: "Slot is already booked" })
        }
        const event = await Event.create({
            username,
            title,
            roomName,
            StartTime: startTimeIST,
            EndTime: endTimeIST,
            availability,
            User

        });
        res.status(201).json({ message: "data posted" })

    } catch (err) {
        res.status(400).json({ err, message: "somting went wrong" })
        console.log(err)
    }
};



// Get all events
const GetEventRoute = async (req, res) => {
    try {
        const events = await Event.find();
        res.send(events);
    } catch (err) {
        res.status(500).send(err);
    }
};



// const GetUserEvent = async (req, res) => {

//     try {

//         const userId = req.params.id;
//         console.log(userId)
//         const user = await userdetail.findById(userId);
//         console.log(user)
//         const events = await Event.find({ user: userId }).populate('User');
//         res.send({
//             user: user,
//             events: events
//         });

//     } catch (err) {
//         res.status(500).send(err);
//     }
// };

const GetUserEvent = async (req, res) => {
    console.log(req.params.id)
    try {

        const userId = req.params.id;
        console.log(userId)
        // const user = await userdetail.findById(userId);
        // const events = await Event.find({ user: userId }).populate('User');
        // const events =await Event.find({user: userId})
        const get = { User: userId }
        const events = await Event.find(get);
        console.log(events)

        res.send({
            events: events
        });

    } catch (err) {
        res.status(500).send(err);
    }
};





// Update an event by ID
// const UpdateEvent = async (req, res) => {
//     const updates = Object.keys(req.body);
//     const allowedUpdates = ['username', 'title', 'roomName', 'StartTime', 'EndTime', 'availability'];
//     const isValidOperation = updates.every(update => allowedUpdates.includes(update));
//     if (!isValidOperation) {
//         return res.status(400).send({ error: 'Invalid updates!' });
//     }
//     try {
//         const event = await Event.findById(req.params.id);
//         if (!event) {
//             return res.status(404).send();
//         }
//         updates.forEach(update => event[update] = req.body[update]);
//         await event.save();
//         res.send(event);
//     } catch (err) {
//         res.status(400).send(err);
//     }
// };


const UpdateEvent = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['username', 'title', 'roomName', 'StartTime', 'EndTime', 'availability'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).send();
        }
        updates.forEach(update => {
            if (update === 'StartTime' || update === 'EndTime') {
                // Convert to IST timezone
                event[update] = moment.tz(req.body[update], 'YYYY-MM-DD HH:mm:ss', 'UTC').tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');
            } else {
                event[update] = req.body[update];
            }
        });
        console.log(updates)
      

        await event.save();
        res.send(event);
    } catch (err) {
        res.status(400).send(err);
    }
};


// Delete an event by ID
const DeleteEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        if (!event) {
            return res.status(404).send();
        }
        res.send(event);
    } catch (err) {
        res.status(500).send(err);
    }
};

module.exports = { CreateEvent, GetEventRoute, GetUserEvent, DeleteEvent, UpdateEvent, };






