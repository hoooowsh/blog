const express = require('express');
const journal = require('../journal_controller');
const router = express.Router();

// read journal route
router.route("/:journal_id").get(catchAsync(journal.readJournal));

// add journal route
router.route("/").post(catchAsync(journal.CreateJournal));

// update journal route
router.route("/:journal_id").put(catchAsync(journal.updateJournal));

// delete journal route
router.route("/:journal_id").delete(catchAsync(journal.deleteJournal));


module.exports = router;