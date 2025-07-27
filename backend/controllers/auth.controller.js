import bcryptjs from 'bcryptjs';
import { User } from '../models/user.module.js';
import { generateVerificationToken } from '../utils/generateVerificationToken.js';
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js';


export const signup = async (req, res) => {
    const {email, firstName, password} = req.body;
    try {
        if(!email || !firstName || !password) {
            throw new Error("Введіть дані в усі поля!");
        }



        const userAlreadyExists = await User.findOne({ email });
        console.log("userAlreadyExists", userAlreadyExists);

        if(userAlreadyExists) {
            return res.status(400).json({success:false, message: "Користувач вже існує!"});
        }

        const hashedPassword = await bcryptjs.hash(password, 10);
        const verificationToken = generateVerificationToken();
        const user = new User({
            email,
            password: hashedPassword,
            firstName,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 1000 * 60 * 60 * 1 // 1 година
        });

        await user.save();

        // JWT & Cookies
        generateTokenAndSetCookie(res, user._id);

        await sendVerificationEmail(user.email,verificationToken);

        res.status(201).json({
            success: true,
            message: "Користувач успішно створений",
            user: {
                ...user._doc,
                password: undefined
            },
        });

    } catch (error) {
        return res.status(400).json({success:false, message: error.message});
    }
};

export const login = async (req, res) => {
    res.send("login route");
};

export const logout = async (req, res) => {
    res.send("logout route");
};