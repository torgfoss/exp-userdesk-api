import asyncHandler from 'express-async-handler';

// @desc    Get current user
// @route   GET /api/v1/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  const { password: _, ...userData } = req.user;

  res.status(200).json({
    success: true,
    message: 'User details successfully fetched ',
    data: userData,
  });
});

export { getMe };
