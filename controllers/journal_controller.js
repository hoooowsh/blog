const Journal = require('../model/schema_journal').Journal;
const ServerError = require('../utils/serverError');
const ResponseBody = require('../utils/respBody');
const mongoId = require('mongoose').Types.ObjectId;


// read journal function
async function readJournal(req, res) {
    const journal_id = req.params.journal_id;
    if (mongoId.isValid(journal_id)) {
        let journalFound;
        try {
            journalFound = await Journal.findById(journal_id);
        } catch (err) {
            throw new ServerError(err.code, 500, "Error: Something wrong when trying to find journal by ID");
        }
        if (!journalFound) {
            throw new ServerError(404, 404, "Error: Journal not found!", false);
        } else {
            const status = 200;
            const resp = new ResponseBody(
                status,
                journalFound,
                "Journal found succeed",
                true
            );
            res.status(status).json(resp);
        }
    } else {
        throw new ServerError(400, 400, "Error: Invalid journal id!", false);
    }
}

// create journal function
async function createJournal(req, res) {
    const newJournal = new Journal(req.body);
    newJournal.date = Date.now();
    try {
        await newJournal.save();
        const status = 201;
        const resp = new ResponseBody(status, newJournal.id, "Journal creation succeed", true);
        console.log(newJournal.id);
        res.status(status).json(resp);
    } catch (err) {
        throw new ServerError(err.code, 500, "Error: Something wrong when trying to create journal!");
    }
}

// update journal function
async function updateJournal(req, res) {
    const journal_id = req.params.journal_id;
    let journal;
    try {
        journal = await Journal.findByIdAndUpdate(journal_id, { ...req.body.journal }, { runValidators: true, new: true });
    } catch (err) {
        throw new ServerError(err.code, 500, "Error: Something wrong when trying to update journal!");
    }
    if (journal) {
        const respBody = new ResponseBody(200, journal, "Journal update succeed");
        res.status(200).json(respBody);
    } else {
        throw new ServerError(400, 400, "Error: Journal not found for updating!", false);
    }
}

// delete journal function
async function deleteJournal(req, res) {
    const journal_id = req.params.journal_id;
    let journal;
    try {
        journal = await Journal.findByIdAndDelete(journal_id);
    } catch (err) {
        throw new ServerError(err.code, 500, "Error: Something wrong when trying to delete journal!");
    }
    if (journal) {
        const respBody = new ResponseBody(200, journal, "Journal delete succeed", true);
        console.log("here")
        res.status(200).json(respBody);
    } else {
        throw new ServerError(400, 400, "Error: Journal not found for delete!")
    }
}


module.exports = {
    readJournal,
    createJournal,
    updateJournal,
    deleteJournal
};