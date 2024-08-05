import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateJWTToken = (req : Request, res : Response, next: NextFunction) => {
  const accessToken = req.header("jwtToken");
  if(accessToken) {
      if(!process.env.JWT_SECRET)
          return res.status(403).json({message: "Please provide token"})
      jwt.verify(accessToken, process.env.JWT_SECRET, (err, data) => {
          if(err) {
              return res.status(403).json({message: "Got Authentication Error " + err});
          }
          if(!data) {
              return res.status(403).json({message: "Got Authentication Error, data is undefined"})
          }
          if(typeof data === "string")
              return res.status(403).json({message: "Got Authentication Error, data is of type string"})
          req.headers["id"] = data.user.id
          next();
      })
  }
  else {
      res.status(404).json({message: "Please Provide Jwt token"})
  }
}
