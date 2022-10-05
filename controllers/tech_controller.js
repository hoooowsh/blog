const Tech = require('../model/schema_technical').Technical;
const ServerError = require('../utils/serverError');
const ResponseBody = require('../utils/respBody');
const mongoId = require('mongoose').Types.ObjectId;


// read tech function
async function readTech(req, res) {
    const tech_id = req.params.tech_id;
    if (mongoId.isValid(tech_id)) {
        let techFound;
        try {
            techFound = await Tech.findById(tech_id);
        } catch (err) {
            throw new ServerError(err.code, 500, "Error: Something wrong when trying to find tech by ID");
        }
        if (!techFound) {
            throw new ServerError(404, 404, "Error: Tech not found!", false);
        } else {
            const status = 200;
            const resp = new ResponseBody(
                status,
                techFound,
                "Tech found succeed",
                true
            );
            res.status(status).json(resp);
        }
    } else {
        throw new ServerError(400, 400, "Error: Invalid tech id!", false);
    }
}

// create tech function
async function createTech(req, res) {
    const newTech= new Tech(req.body);
    newTech.date = Date.now();
    try {
        await newTech.save();
        const status = 201;
        const resp = new ResponseBody(status, newTech.id, "Tech creation succeed", true);
        res.status(status).json(resp);
    } catch (err) {
        throw new ServerError(err.code, 500, "Error: Something wrong when trying to create tech!");
    }
}

// update tech function
async function updateTech(req, res) {
    const tech_id = req.params.tech_id;
    let tech;
    try {
        tech = await Tech.findByIdAndUpdate(tech_id, { ...req.body.tech }, { runValidators: true, new: true });
    } catch (err) {
        throw new ServerError(err.code, 500, "Error: Something wrong when trying to update tech!");
    }
    if (tech) {
        const respBody = new ResponseBody(200, tech, "Tech update succeed");
        res.status(200).json(respBody);
    } else {
        throw new ServerError(400, 400, "Error: Tech not found for updating!", false);
    }
}

// delete tech function
async function deleteTech(req, res) {
    const tech_id = req.params.tech_id;
    let tech;
    try {
        tech = await Tech.findByIdAndDelete(tech_id);
    } catch (err) {
        throw new ServerError(err.code, 500, "Error: Something wrong when trying to delete tech!");
    }
    if (tech) {
        const respBody = new ResponseBody(200, tech, "Tech delete succeed", true);
        res.status(200).json(respBody);
    } else {
        throw new ServerError(400, 400, "Error: Tech not found for delete!")
    }
}


module.exports = {
    readTech,
    createTech,
    updateTech,
    deleteTech
};