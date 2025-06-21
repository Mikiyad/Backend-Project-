import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";

interface DecodedToken {
  userId?: string;
}

const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.header("authorization");
    if (!authHeader) {
      throw new Error("Authorization header is missing");
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      throw new Error("Token is missing");
    }

    const decodedToken = jwt.verify(
      token,
      process.env.jwt_secret as Secret
    ) as DecodedToken;
    if (!decodedToken) {
      throw new Error("Invalid token");
    } 
    req.headers.userId = decodedToken.userId;
     req.body.userId = decodedToken.userId;
    next();
  } catch (error: any) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

export default authMiddleware;
