const express = require('express')
const model = require('../models/models')
const router = express.Router()

router.get('/getAll', async (req, res) => {
    try {
        const user = await model.find()
        res.json(user)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// id: 63f6afcd2ff9081f3609eb05, 63f6af9b3c760c8489219a92

router.get('/getOne/:id', async (req, res) => {
    try {
        const user = await model.findById(req.params.id)
        res.json(user)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.post('/post', async (req, res) => {
    const User = new model({
        name: req.body.name,
        age: req.body.age
    })

    try {
        const saveUser = await User.save()
        res.status(200).json(saveUser)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

router.patch('/patch/:id', async (req, res) => {
    try {
        const id = req.params.id
        const userUpdate = req.body
        const options = { new: true }

        const result = await model.findByIdAndUpdate(
            id, userUpdate, options
        )
        res.send(result)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        await model.findByIdAndDelete(req.params.id)
        res.send(` ${req.params.id} Has Been Deleted` )
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})


module.exports = router
