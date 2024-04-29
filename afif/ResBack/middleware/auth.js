


// module.exports = authenticate;
const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: Access token is required' });
  }
  const accessToken = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    if (!decoded.user) {
      return res.status(200).json({ message: 'Unauthorized: Access token is required' });
    }
    req.isAdmin = true;
    next();
  } catch (error) {
    console.error('Error authenticating user:', error);
    if (error.name === 'TokenExpiredError') {
      return res.status(200).json({ message: 'Unauthorized: Access token is required' });
    }
    return res.status(403).json({ message: 'Forbidden: Invalid token' });
  }
};
const authenticateAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: Access token is required' });
  }
  const accessToken = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    if (!decoded.admin) {
      return res.status(200).json({ message: 'Unauthorized: Access token is required' });
    }
    req.isAdmin = true;
    next();
  } catch (error) {
    console.error('Error authenticating user:', error);
    if (error.name === 'TokenExpiredError') {
      return res.status(200).json({ message: 'Unauthorized: Access token is required' });
    }
    return res.status(403).json({ message: 'Forbidden: Invalid token' });
  }
};
module.exports = {
  authenticateUser,
  authenticateAdmin
}