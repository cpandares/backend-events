const { response } = require('express');
const Event = require('../models/Events');


const getEvents = async ( req, res = response )=>{

    const events = await Event.find()
                         .populate('user', 'name')

    res.status(200).json({
        ok: true,
        msg: 'Todos los events',
        events
    })

}

const createEvent = async(req, res = response)=>{

    const event = new Event(req.body);

    try {
        event.user = req.uid;

        await event.save();

        res.status(200).json({
            ok: true,
            msg: 'Event create', 
            event
        })

    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Please talk with admin'
        })
        
    }

    
    
}


const editEvent = async (req, res = response)=>{

    const eventId = req.params.id;

    try {
        
        const event =await Event.findById(eventId);

        if(!event){
            return  res.status(404).json({
                ok: false,
                msg: 'Event not found',
                
            });
        }

        if( req.uid !== event.user.toString() ){
            
         return   res.status(401).json({
                ok: false,
                msg: 'Forbbiden',
                
            });
            
        }

        const newData = {
            ...req.body,
            user: req.uid
        }

        const eventUpdated = await Event.findByIdAndUpdate(eventId, newData, { new:true })


        res.status(200).json({
            ok: true,
            msg: 'Edit  event',
            eventUpdated
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Please talk with admin'
        })
    }
    
   
}

const deleteEvent = async(req, res = response)=>{

    const eventId = req.params.id;

    try {
        
        const event =await Event.findById(eventId);

        if(!event){
           return res.status(404).json({
                ok: false,
                msg: 'Event not found',
                
            });
        }

        if( req.uid !== event.user.toString() ){
            
         return   res.status(401).json({
                ok: false,
                msg: 'Forbbiden',
                
            });
            
        }

        await Event.findByIdAndDelete(eventId);

        res.status(200).json({
            ok: true,
            msg: 'Edit  deleted',
            
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Please talk with admin'
        })
    }

    
 
}

module.exports = {
    getEvents,
    createEvent,
    editEvent,
    deleteEvent,
}