const jwt = require("jsonwebtoken");
const secret = "Hritik@123";


function setUser(user) {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
    secret
  );
}

function getUser(token) {
    if (!token) return null;
    try {
      return jwt.verify(token, secret);
    } catch (error) {
      console.error("Error verifying JWT token:", error);
      return null; // or handle the error in an appropriate way
    }
  }

module.exports = {
  getUser,
  setUser,
};
