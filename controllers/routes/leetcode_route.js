const express = require('express');
const leetcode = require('../leetcode_controller');
const router = express.Router();
const catchAsync = require('../../utils/catchAsync');


// read leetcode route
router.route("/:leetcode_id").get(catchAsync(leetcode.readLeetcode));

// add leetcode route
router.route("/").post(catchAsync(leetcode.createLeetcode));

// update leetcode route
router.route("/:leetcode_id").put(catchAsync(leetcode.updateLeetcode));

// delete leetcode route
router.route("/:leetcode_id").delete(catchAsync(leetcode.deleteLeetcode));


module.exports = router;