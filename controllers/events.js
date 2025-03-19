const { response } = require('express');
const Event = require('../models/Event');

const getEvents = async (req, res = response) => {

    // const events = await Event.find().populate('user', 'name password'); // Populate the user field with the name and password fields
    const events = await Event.find().populate('user', 'name'); // Populate the user field with the name field

    res.json({
        ok: true,
        events
    });
}

const createEvent = async (req, res = response) => {

    const event = new Event(req.body);

    try {
        event.user = req.uid;
        const eventSaved = await event.save();
        res.json({
            ok: true,
            event: eventSaved
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Please contact the administrator'
        });
    }
}

const updateEvent = async (req, res = response) => {
    const eventId = req.params.id;
    const { uid } = req;

    try {
        const event = await Event.findById( eventId );
        if (!event) {
            return res.status(404).json({
                ok: false,
                message: 'Event not found'
            });
        }

        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                message: 'You do not have the necessary permissions'
            });
        }

        const newEvent = {
            ...req.body,
            user: uid
        }

        const eventUpdated = await Event.findByIdAndUpdate(eventId, newEvent, { new: true }); // { new: true } -> Return the updated event
        res.json({
            ok: true,
            event: eventUpdated
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Please contact the administrator'
        });
    }
}

const deleteEvent = async (req, res = response) => {
    const eventId = req.params.id;
    const { uid } = req;

    try{

        const event = await Event.findById( eventId );
        if (!event) {
            return res.status(404).json({
                ok: false,
                message: 'Event not found'
            });
        }

        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                message: 'You do not have the necessary permissions'
            });
        }

        await Event.findByIdAndDelete(eventId);
        res.json({ ok: true });

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Please contact the administrator'
        });
    }
}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
};