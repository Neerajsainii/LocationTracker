import jwt, { JwtPayload } from 'jsonwebtoken';

const SECRET_KEY = 'your_secret_key'; // Replace with a secure key

export const generateToken = (payload: object): string => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
};

export const verifyToken = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(token, SECRET_KEY) as JwtPayload;
  } catch (error) {
    return null;
  }
}; 