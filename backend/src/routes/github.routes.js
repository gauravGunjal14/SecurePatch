const express = require("express");
const githubApp = require("../config/github");

const router = express.Router();

router.get("/test", async (req, res, next) => {
    try {
        const { data } = await githubApp.octokit.request("GET /app");

        return res.status(200).json({
            success: true,
            data: {
                id: data.id,
                name: data.name,
                slug: data.slug,
            },
            message: "GitHub App authentication successful",
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;