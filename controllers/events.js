const { response } = require('express')
const Event = require('../models/events')

const getEvents = async ( _ ,res =response)=>{
    try {
        const events = await Event.find().populate('user',"name")
        res.status(200).json({
            ok: true,
            msg: events
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg: "Something went wrong"
        })
    }
}

const createEvent = async (req,res =response)=>{

    const event = new Event(req.body)

    try {

        event.user = req.id
        const saveEvent = await event.save()

        res.status(201).json({
            ok:true,
            event: saveEvent
        })

    } catch (error) {

        console.log(error)
        
        res.status(500).json({
            ok: false,
            msg:" Something went wrong"
        })

    }
}

const updateEvent = async (req,res =response)=>{

    const evenId = req.params.id
    const id = req.id
    try {
        const event = await Event.findById(evenId)

        if(!event){
            res.status(404).json({
                ok:false,
                msg:"The event doesnt exist"
            })
        }

        if(event.user.toString() !== id){
            res.status(401).json({
                ok:false,
                msg:" Not auth"
            })
        }

        const newEvent ={
            ...req.body,
              user: id
        }

        const updatedEvent = await Event.findByIdAndUpdate(evenId, newEvent, {new:true})
        res.status(200).json({
            ok: true,
            msg: "Update successfully",
            event: updatedEvent
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg: "Something went wrong"
        })
    }
}

const deleteEvent = async (req,res =response)=>{
    const evenId = req.params.id
    const id = req.id
    try {
        const event = await Event.findById(evenId)

        if(!event){
           return  res.status(404).json({
                ok:false,
                msg:"The event doesnt exist"
            })
        }

        if(event.user.toString() !== id){
          return  res.status(401).json({
                ok:false,
                msg:" Not auth"
            })
        }

        await Event.findByIdAndDelete(evenId)
        res.status(200).json({
            ok: true,
            msg: "delete successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg: "Something went wrong"
        })
    }
}

module.exports ={
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}