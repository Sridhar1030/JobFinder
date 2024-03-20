export const sendToken = (user, statusCode, res, message) => {
  const token = user.getJWTToken();
  const expiresIn = process.env.JWT_EXPIRES || '7d'; // Default to 7 days if JWT_EXPIRES is not set
  const options = {
    expires: new Date(
      Date.now() + (process.env.COOKIE_EXPIRE || 7) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true, // Set httpOnly to true
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    message,
    token,
  });
};
