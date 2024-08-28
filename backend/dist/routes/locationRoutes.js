"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const locationController_1 = require("../controllers/locationController");
const router = (0, express_1.Router)();
router.post('/', locationController_1.addLocation);
router.get('/:userId', locationController_1.getLocations);
exports.default = router;
