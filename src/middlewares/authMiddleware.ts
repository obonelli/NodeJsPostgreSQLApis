import { Response, NextFunction } from "express";
import { IRequestWithUser } from '../types/messageTypes'; // Make sure to adjust the import path according to the location of your types file
import jwt, { JwtPayload } from 'jsonwebtoken';

const authMiddleware = (req: IRequestWithUser, res: Response, next: NextFunction) => {
  // Get the authorization header
  const authHeader = req.headers.authorization;

  // If the authorization header is not present, return a 401 unauthorized error
  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "Access denied. Token not provided." });
  }

  // Extract the token from the authorization header
  const token = authHeader.split(" ")[1];

  // Verify and validate the token
  const secretKey = process.env.JWT_SECRET!; // Get the secret key from an environment variable
  try {
    const decoded = jwt.verify(token, secretKey);

    // If the token is valid, you can add the decoded information to the req object if necessary
    if (typeof decoded !== 'string' && (decoded as JwtPayload)) {
      req.user = decoded as Record<string, any>;
    }

    // If the token is valid, call next() to continue with the controller
    next();
  } catch (error: any) {
    console.error(error);
    res.status(401).json({ message: `Access denied. Invalid token. Error details: ${error.message}` });
  }
};

export default authMiddleware;