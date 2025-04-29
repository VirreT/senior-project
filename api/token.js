const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
require("dotenv").config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

const validateRequest = (validations) => {
    return async (req, res, next) => {
        await Promise.all(validations.map(validation => validation.run(req)));
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    };
};

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "No access token provided" });
    }

    const token = authHeader.split(" ")[1];
    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ error: "Invalid access token" });
        req.user = decoded;
        next();
    });
};

const generateTokens = (user) => {
    const accessToken = jwt.sign({ username: user.username, auth: "user" }, ACCESS_TOKEN_SECRET, { expiresIn: "2m" });
    const refreshToken = jwt.sign({ username: user.username }, REFRESH_TOKEN_SECRET, { expiresIn: "12h" });
    return { accessToken, refreshToken };
};

const refreshToken = (refreshToken) => {
    return new Promise((resolve, reject) => {
        jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                return reject("Invalid refresh token");
            }
            const { accessToken, refreshToken: newRefreshToken } = generateTokens(decoded);
            resolve({ accessToken, newRefreshToken });
        });
    });
};

function validateRefreshToken(token) {
    return jwt.verify(token, REFRESH_TOKEN_SECRET, (err, decoded) => (err ? null : decoded));
}

async function handleRefreshToken(req, res) {
    const { refreshToken } = req.body;

    const payload = validateRefreshToken(refreshToken);
    if (!payload) {
        return res.status(401).json({ error: "Invalid refresh token" });
    }

    const newAccessToken = jwt.sign(
        { username: payload.username },
        ACCESS_TOKEN_SECRET,
        { expiresIn: "2m" }
    );
    res.json({ access_token: newAccessToken });
}

async function autoLogin(req, res) {
    const refreshToken = req.cookies?.refresh_token;
    if (!refreshToken) {
        return res.status(401).json({ error: "No refresh token provided" });
    }

    try {
        const payload = validateRefreshToken(refreshToken);
        if (!payload) {
            return res.status(401).json({ error: "Invalid refresh token" });
        }

        const newAccessToken = jwt.sign(
            { username: payload.username },
            ACCESS_TOKEN_SECRET,
            { expiresIn: "2m" }
        );

        res.json({ access_token: newAccessToken });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = { 
    validateRequest, 
    verifyToken, 
    generateTokens, 
    refreshToken, 
    validateRefreshToken, 
    handleRefreshToken,
    autoLogin 
};