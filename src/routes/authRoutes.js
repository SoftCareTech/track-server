const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const User = mongoose.model('User')

router.post('/signup', async (req, res) => {
    try {
        const { email, password } = req.body
        const user = new User({ email, password })
        await user.save()
        const token = jwt.sign(
            { userId: user._id }, "key"
        )
        res.send({ token })
    } catch (err) {
        return res.status(422).send(err.message)
    }
})

router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) return res.status(422).send("must provide credential")

        const user = await User.findOne({ email })
        if (!user) return res.status(422).send("Invalid password or email")

        try {
            await user.comparePassword(password)
            const token = jwt.sign({ userId: user._id },
                "key")
            res.send({ token })
        } catch (err) {
            return res.status(422).send({ error: "Invalid password or email y" })
        }
    } catch (err) {
        return res.status(422).send(err.message)
    }
})
module.exports = router





