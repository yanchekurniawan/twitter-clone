import jwt from "jsonwebtoken";

export const generateAndSetToken = (id, res) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true /* prevent XSS attack */,
    sameSite: "strict" /* prevent CSRF attack */,
    secure: process.env.NODE_ENV !== "development",
  });
};
