import jwt from "jsonwebtoken";

const userAuthentication = (req, res, next) => {
  const tokenHeader = req.headers["authorization"];

  if (!tokenHeader) {
    return res.status(401).json({ error: "Unauthorized" });
  } 

  const token = tokenHeader.split(" ")[1];
  console.log(token);

  jwt.verify(token, "fks84tn8vnvvtn3n8", {algorithm: "HS256"},(err, user) => {
    if (err) {
      return res.status(403).json({ error: "Forbidden" });
    }

    req.user = user;
    next();
  });
};

export default userAuthentication;
