const ApiResponse = require("../utils/ApiResponse");

const healthCheck = (req, res) => {
  return ApiResponse.success(
    res,
    {
      status: "ok",
      service: "securepatch-backend",
    },
    "SecurePatch backend is healthy"
  );
};

module.exports = {
  healthCheck,
};