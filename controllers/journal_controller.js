const Journal = require('../model/schema_journal').Journal;
const ServerError = require('../utils/serverError');
const ResponseBody = require('../utils/respBody');
const mongoId = require('mongoose').Types.ObjectId;


// get journal function
async function readJournal(req, res) {
    const journal_id = req.params.id;
    if (mongodID.isValid(journal_id)) {
        let journalFound;
        try {
            journalFound = await Journal.findById(journal_id);
        } catch (err) {
            throw new ServerError(err.code, 500, err.message);
        }
        if (!journalFound) {
            
        }

    } else {
        throw new ServerError(400, 400, "Error: Invalid journal id!", false);
    }
}