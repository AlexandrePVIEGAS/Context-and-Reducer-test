const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.cookies.Token;
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;
    req.auth = { userId };
    if (req.body.userId && req.body.userId !== userId) {
      throw "User ID invalide !";
    } else {
      // userIdFromTheToken = userId; tester avec req.auth
      next();
    }
  } catch (error) {
    res.status(401).json({ error });
  }
};
