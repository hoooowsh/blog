const Journey = require('../model/schema_journey').Journey;
const ServerError = require('../utils/serverError');
const ResponseBody = require('../utils/respBody');
const mongoId = require('mongoose').Types.ObjectId;


// read journey function
async function readJourney(req, res) {
    const journey_id = req.params.journey_id;
    if (mongoId.isValid(journey_id)) {
        let journeyFound;
        try {
            journeyFound = await Journey.findById(journey_id);
        } catch (err) {
            throw new ServerError(err.code, 500, "Error: Something wrong when trying to find journey by ID");
        }
        if (!journeyFound) {
            throw new ServerError(404, 404, "Error: Journey not found!", false);
        } else {
            const status = 200;
            const resp = new ResponseBody(
                status,
                journeyFound,
                "Journey found succeed",
                true
            );
            res.status(status).json(resp);
        }
    } else {
        throw new ServerError(400, 400, "Error: Invalid journey id!", false);
    }
}

// create journey function
async function createJourney(req, res) {
    const newJourney = new Journey(req.body);
    newJourney.date = Date.now();
    try {
        await newJourney.save();
        const status = 201;
        const resp = new ResponseBody(status, newJourney.id, "Journey creation succeed", true);
        res.status(status).json(resp);
    } catch (err) {
        throw new ServerError(err.code, 500, "Error: Something wrong when trying to create journey!");
    }
}

// update journey function
async function updateJourney(req, res) {
    const journey_id = req.params.journey_id;
    let journey;
    try {
        journey = await Journey.findByIdAndUpdate(journey_id, { ...req.body.journey }, { runValidators: true, new: true });
    } catch (err) {
        throw new ServerError(err.code, 500, "Error: Something wrong when trying to update journey!");
    }
    if (journey) {
        const respBody = new ResponseBody(200, journey, "Journey update succeed");
        res.status(200).json(respBody);
    } else {
        throw new ServerError(400, 400, "Error: Journey not found for updating!", false);
    }
}

// delete journey function
async function deleteJourney(req, res) {
    const journey_id = req.params.journey_id;
    let journey;
    try {
        journey = await Journey.findByIdAndDelete(journey_id);
    } catch (err) {
        throw new ServerError(err.code, 500, "Error: Something wrong when trying to delete journey!");
    }
    if (journey) {
        const respBody = new ResponseBody(200, journey, "Journey delete succeed", true);
        res.status(200).json(respBody);
    } else {
        throw new ServerError(400, 400, "Error: Journey not found for delete!")
    }
}


module.exports = {
    readJourney,
    createJourney,
    updateJourney,
    deleteJourney
};