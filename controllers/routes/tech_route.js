const express = require('express');
const tech = require('../tech_controller');
const router = express.Router();
const catchAsync = require('../../utils/catchAsync');


// read tech route
router.route("/:tech_id").get(catchAsync(tech.readTech));

// add tech route
router.route("/").post(catchAsync(tech.createTech));

// update tech route
router.route("/:tech_id").put(catchAsync(tech.updateTech));

// delete tech route
router.route("/:tech_id").delete(catchAsync(tech.deleteTech));


module.exports = router;