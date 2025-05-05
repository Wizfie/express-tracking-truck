import jwt from "jsonwebtoken";

const generateToken = (userId, username) => {
  const payload = {
    userId,
    username,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};

const blacklist = new Set(); // Set untuk menyimpan token yang diblacklist
const blacklistToken = (token) => {
  blacklist.add(token);
};

const clearBlackList = () => {
  setInterval(() => {
    console.log("Clearing blacklist...");

    blacklist.clear();
  }, 12 * 60 * 60 * 1000);
};

const verifyAuth = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res.status(403).send("Token not provided");
  }

  // Cek apakah token ada di blacklist
  if (blacklist.has(token)) {
    return res.status(403).send("Token not valid");
  }

  const decode = verifyToken(token);
  if (!decode) {
    return res.status(403).send("Token Invalid");
  }

  req.user = decode;
  next();
};

export {
  generateToken,
  verifyToken,
  verifyAuth,
  blacklistToken,
  clearBlackList,
};
