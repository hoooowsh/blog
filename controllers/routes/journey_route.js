const express = require('express');
const journey = require('../journey_controller');
const router = express.Router();
const catchAsync = require('../../utils/catchAsync');


// read journey route
router.route("/:journey_id").get(catchAsync(journey.readJourney));

// add journey route
router.route("/").post(catchAsync(journey.createJourney));

// update journey route
router.route("/:journey_id").put(catchAsync(journey.updateJourney));

// delete journey route
router.route("/:journey_id").delete(catchAsync(journey.deleteJourney));


module.exports = router;