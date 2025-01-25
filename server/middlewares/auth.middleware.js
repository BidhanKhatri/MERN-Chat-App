import jwt from "jsonwebtoken";

export const authMiddleWare = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({
        msg: "Unauhorized: No token provided",
        success: false,
        error: true,
      });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    if (!decode) {
      return res.status(401).json({
        msg: "Unauthorized: Invalid token",
      });
    }
    req.userId = decode.userId;
    next();
  } catch (error) {
    return res.status(500).json({
      msg: error.message || error,
      success: false,
      error: true,
    });
  }
};
