const express = require("express");
const { getMembers, addMember, } = require("../controllers/member.controller");
const { requireAuth, } = require("../middleware/auth.middleware");
const { requireOrganizationMember, } = require("../middleware/organization.middleware");
const { requireRole, } = require("../middleware/rbac.middleware");

const router = express.Router();

router.get(
    "/:organizationId/members",
    requireAuth,
    requireOrganizationMember,
    getMembers
);

router.post(
    "/:organizationId/members",
    requireAuth,
    requireOrganizationMember,
    requireRole("owner", "admin"),
    addMember
);

module.exports = router;