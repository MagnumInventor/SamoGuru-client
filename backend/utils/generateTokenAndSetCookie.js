import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "9d",
    });

    res.cookie("token", token, {
        httpOnly: true, // забороняє доступ з JS (тільки з https)
        secure: true, // захист від XSS атак REMOVED RULE -> (process.env.NODE_ENV === "production")
        sameSite: "none", // захист від CSRF атак REMOVED RULE -> "strict"
        maxAge: 12 * 24 * 60 * 60 * 1000, // Тривалість життя токену (12 днів)
    });

    return token;
};