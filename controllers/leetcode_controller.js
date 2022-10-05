const Leetcode = require('../model/schema_leetcode').Leetcode;
const ServerError = require('../utils/serverError');
const ResponseBody = require('../utils/respBody');
const mongoId = require('mongoose').Types.ObjectId;


// read leetcode function
async function readLeetcode(req, res) {
    const leetcode_id = req.params.leetcode_id;
    if (mongoId.isValid(leetcode_id)) {
        let leetcodeFound;
        try {
            leetcodeFound = await Leetcode.findById(leetcode_id);
        } catch (err) {
            throw new ServerError(err.code, 500, "Error: Something wrong when trying to find leetcode by ID");
        }
        if (!leetcodeFound) {
            throw new ServerError(404, 404, "Error: Leetcode not found!", false);
        } else {
            const status = 200;
            const resp = new ResponseBody(
                status,
                leetcodeFound,
                "Leetcode found succeed",
                true
            );
            res.status(status).json(resp);
        }
    } else {
        throw new ServerError(400, 400, "Error: Invalid leetcode id!", false);
    }
}

// create leetcode function
async function createLeetcode(req, res) {
    const newLeetcode = new Leetcode(req.body);
    newLeetcode.date = Date.now();
    try {
        await newLeetcode.save();
        const status = 201;
        const resp = new ResponseBody(status, newLeetcode.id, "Journal creation succeed", true);
        res.status(status).json(resp);
    } catch (err) {
        throw new ServerError(err.code, 500, "Error: Something wrong when trying to create leetcode!");
    }
}

// update leetcode function
async function updateLeetcode(req, res) {
    const leetcode_id = req.params.leetcode_id;
    let leetcode;
    try {
        leetcode = await Leetcode.findByIdAndUpdate(leetcode_id, { ...req.body.leetcode }, { runValidators: true, new: true });
    } catch (err) {
        throw new ServerError(err.code, 500, "Error: Something wrong when trying to update leetcode!");
    }
    if (leetcode) {
        const respBody = new ResponseBody(200, leetcode, "Leetcode update succeed");
        res.status(200).json(respBody);
    } else {
        throw new ServerError(400, 400, "Error: Leetcode not found for updating!", false);
    }
}

// delete leetcode function
async function deleteLeetcode(req, res) {
    const leetcode_id = req.params.leetcode_id;
    let leetcode;
    try {
        leetcode = await Leetcode.findByIdAndDelete(leetcode_id);
    } catch (err) {
        throw new ServerError(err.code, 500, "Error: Something wrong when trying to delete leetcode!");
    }
    if (leetcode) {
        const respBody = new ResponseBody(200, leetcode, "Leetcode delete succeed", true);
        res.status(200).json(respBody);
    } else {
        throw new ServerError(400, 400, "Error: Leetcode not found for delete!")
    }
}


module.exports = {
    readLeetcode,
    createLeetcode,
    updateLeetcode,
    deleteLeetcode
};