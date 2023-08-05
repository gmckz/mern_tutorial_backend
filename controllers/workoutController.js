const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

// get all workouts
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1})
    res.status(200).json(workouts)
}
// get a single workout
const getWorkout = async (req, res) => {
    const { id } = req.params //id here comes from route

// check if id is valid (should be mongoose ObjectId type)
if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such workout'})
}

    const workout = await Workout.findById(id)
    // if workout is null i.e. no workout exists for given id, return 404 and error mssg
    if (!workout) {
        return res.status(404).json({error: 'No such workout'})
    }

    res.status(200).json(workout)
}

// create new workout
const createWorkout = async (req, res) => {
    const {title, load, reps} = req.body
    // add doc to db
    try {
        const workout = await Workout.create({title, load, reps})
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params
    // if is not valid mongoose objectid type return 404 and error message
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }

    const workout = await Workout.findOneAndDelete({ _id: id }) //_id is the mongodb id property, id is what we get from request params
    // if no such workout exists with given id return 404 and error message
    if (!workout) {
        return res.status(404).json({error: 'No such workout'})
    }

    res.status(200).json(workout)
}

// update a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }

    const workout = await Workout.findOneAndUpdate({ _id: id }, {
        ...req.body // ... spreads over workout object, gets all its properties and overwrites existing properties with ones in req.body 
    })

    if (!workout) {
        return res.status(404).json({error: 'No such workout'})
    }
    
    res.status(200).json(workout)
}

module.exports = {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
}