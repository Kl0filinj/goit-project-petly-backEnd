const express = require("express");
const router = express.Router();

const {
  registerController,
  loginController,
  getCurrentController,
  logoutController,
  updateController,
  avatarController,
  getStatusController,
  recoveryController,
  resetPasswordController,
  googleController,
} = require("../controllers/userControllers");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { asyncWrapper } = require("../helpers/apiHelpers");
const validateBody = require("../middlewares/validateBody");
const { upload } = require("../middlewares/upload");
const { schemas } = require("../models/userModel");
const passport = require("../middlewares/passport");

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  asyncWrapper(googleController)
);
// sign up
router.post(
  "/register",
  validateBody(schemas.registerSchema),
  asyncWrapper(registerController)
);
// sign in
router.post(
  "/login",
  validateBody(schemas.loginSchema),
  asyncWrapper(loginController)
);
// get all info about user
router.get("/current", authMiddleware, asyncWrapper(getCurrentController));
// check if user is logged in
router.get("/status", authMiddleware, asyncWrapper(getStatusController));
// logout
router.get("/logout", authMiddleware, asyncWrapper(logoutController));
// update all user fields except avatar
router.patch(
  "/update",
  authMiddleware,
  validateBody(schemas.updateFieldSchema),
  asyncWrapper(updateController)
);
// update only user avatar
router.patch(
  "/avatar",
  authMiddleware,
  upload.single("avatar"),
  asyncWrapper(avatarController)
);

// forgot and recover password
router.post("/recovery", asyncWrapper(recoveryController));
router.post(
  "/recovery/:recoveryToken",
  validateBody(schemas.resetPasswordSchema),
  asyncWrapper(resetPasswordController)
);

module.exports = router;
