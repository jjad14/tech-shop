import jwt from "jsonwebtoken";

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_TOKEN_SECRET, {
        expiresIn: 3600
    });
};

export default generateToken;