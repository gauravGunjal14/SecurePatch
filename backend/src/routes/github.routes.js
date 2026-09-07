const express = require("express");

const { githubApp } = require("../config/github");

const {
    getRepositories,
    getRepositoryFiles,
    getFileContent,
} = require("../services/github.service");

const router = express.Router();


// GitHub App authentication test
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


// Get GitHub App installations
router.get("/installations", async (req, res, next) => {
    try {
        const { data } = await githubApp.octokit.request(
            "GET /app/installations"
        );

        return res.status(200).json({
            success: true,
            data: data.map((installation) => ({
                id: installation.id,
                account: installation.account?.login,
                accountType: installation.account?.type,
            })),
            message: "GitHub App installations fetched successfully",
        });
    } catch (error) {
        next(error);
    }
});


// Get repositories available to an installation
router.get("/repositories/:installationId", async (req, res, next) => {
    try {
        const { installationId } = req.params;

        const repositories = await getRepositories(installationId);

        return res.status(200).json({
            success: true,
            data: {
                totalCount: repositories.length,
                repositories,
            },
            message: "GitHub repositories fetched successfully",
        });
    } catch (error) {
        next(error);
    }
});


// Get files from a repository
router.get(
    "/repositories/:installationId/:owner/:repo/files",
    async (req, res, next) => {
        try {
            const {
                installationId,
                owner,
                repo,
            } = req.params;

            const files = await getRepositoryFiles(
                installationId,
                owner,
                repo
            );

            return res.status(200).json({
                success: true,
                data: {
                    repository: `${owner}/${repo}`,
                    files,
                },
                message: "Repository files fetched successfully",
            });
        } catch (error) {
            next(error);
        }
    }
);


// Get content of a repository file
router.get(
    "/repositories/:installationId/:owner/:repo/file",
    async (req, res, next) => {
        try {
            const {
                installationId,
                owner,
                repo,
            } = req.params;

            const { path: filePath } = req.query;

            if (!filePath) {
                return res.status(400).json({
                    success: false,
                    error: {
                        code: "FILE_PATH_REQUIRED",
                        message: "File path is required",
                    },
                });
            }

            const file = await getFileContent(
                installationId,
                owner,
                repo,
                filePath
            );

            return res.status(200).json({
                success: true,
                data: file,
                message: "Repository file fetched successfully",
            });
        } catch (error) {
            next(error);
        }
    }
);


module.exports = router;