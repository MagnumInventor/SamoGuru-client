import jwt from 'jsonwebtoken';


export const protectRoute = (req, res, next) => {
    const token = req.cookies.token;
    if(!token) return res.status(401).json({ success: false, message: "Вхід не підтверджений"});
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if(!decoded) return res.status(401).json({ success: false, message: "Невірний код підтвердження" })
        req.userId = decoded.userId

        next()
        
    } catch (error) {
        console.log("Помилка у підвтердженні користувача ", error);
		res.status(500).json({ success: false, message: "Помилка сервера" });
    }
}