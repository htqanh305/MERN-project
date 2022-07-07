const express = require('express')
const router = express.Router()
const {getGoals, setGoal, putGoal, deleteGoal} = require('../controllers/goalController')

router.route('/')
    .get(getGoals)
    .post(setGoal)

router.route('/:id')
    .put(putGoal)
    .delete(deleteGoal)

module.exports = router