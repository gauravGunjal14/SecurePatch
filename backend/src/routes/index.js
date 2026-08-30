const express = require("express");
const healthRoutes = require("./health.routes");
const authRoutes = require("./auth.routes");
const organizationRoutes = require("./organization.routes");
const memberRoutes = require("./member.routes");

const router = express.Router();

router.use("/health", healthRoutes);
router.use("/auth", authRoutes);
router.use("/organizations", organizationRoutes);
router.use("/organizations", memberRoutes);

module.exports = router;