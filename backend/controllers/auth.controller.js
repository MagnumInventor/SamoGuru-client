import bcryptjs from 'bcryptjs';
import crypto from 'crypto';

import { User } from '../models/user.module.js';
import { testBrevoConnection } from './emailService.js';
import { generateVerificationToken } from '../utils/generateVerificationToken.js';
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js';
import { sendPasswordResetEmail, sendResetSuccessEmail, sendVerificationEmail, sendWelcomeEmail } from '../mailing/emails.js';


// Реєстрація
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

// Підтвердження ел.пошти
export const verifyEmail = async (req, res) => {
    const { code } = req.body;
    try {
        await testBrevoConnection();
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now()}
        })

        if(!user) {
            return res.status(400).json({seccess: false, message: "Неправильний або просрочений код перевірки"})
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save();

        await sendWelcomeEmail(user.email, user.firstName);
        
        res.status(200).json({
            success: true,
            message: "Електронна пошта успішно підтверджена",
            user: {
                ...user._doc,
                password: undefined,
            },
        });
    } catch (error) {
        console.log("Помилка у системі верифікації", error);
        res.status(500).json({success:false, message: "Помилка системи" });
    }
};

// Вхід в акаунт
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({ success: false, message: "Неправильні дані для входу"});
        }
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if(!isPasswordValid) {
            return res.status(400).json({ success: false, message: "Пароль для входу не співпадає"});
        }

        generateTokenAndSetCookie(res, user._id);

        user.entryDate = new Date();
        await user.save();

        res.status(200).json({
            success: true,
            message: "Ви успішно війшли в свій акаунт",
            user: {
                ...user._doc,
                password: undefined,
            },
        });


    } catch (error) {
        console.log("", error);
        res.status(200).json({ success: true, message: error.massage})
    }
};

// Вихід з акаунта
export const logout = async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "Ви успшіно вийшли з свого акаунта"});
};

// Забув пароль
export const forgotPassword = async (req, res) => {
        const { email } = req.body
    try {
        const user = await User.findOne({ email });

        if(!user) {
            return res.status(400).json({ success: false, message: "Користувача не найдено"});
        }

        const resetToken = crypto.randomBytes(52).toString("hex");
        const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000;
        

        user.resetPasswordToken = resetToken;
        user.resetPasswordTokenExpiresAt = resetTokenExpiresAt;

        await user.save();

        const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000';
        await sendPasswordResetEmail(user.email, `${clientUrl}/reset-password/${resetToken}`);
        res.status(200).json({ success: true, message: "Лист для скидання паролю успішно надісланий"});

    } catch (error) {
        console.log("Помилка при надсиланні листа для скидання паролю");
        res.status(400).json({ success: false, message: error.message });
    }
};

// Скидання паролю
export const resetPassword = async (req, res) => {
	try {
		const { token } = req.params;
		const { password } = req.body;

		const user = await User.findOne({
			resetPasswordToken: token,
			resetPasswordTokenExpiresAt: { $gt: Date.now() },
		});

		if (!user) {
			return res.status(400).json({ success: false, message: "Невірний або старий код відновлення" });
		}

		// update password
		const hashedPassword = await bcryptjs.hash(password, 10);

		user.password = hashedPassword;
		user.resetPasswordToken = undefined;
		user.resetPasswordTokenExpiresAt = undefined;
		await user.save();

		await sendResetSuccessEmail(user.email);

		res.status(200).json({ success: true, message: "Пароль відновлено успішно" });
	} catch (error) {
		console.log("Помилка у відновленні паролю ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};

// Перевірка підтвердженої сесії
export const checkAuth = async (req, res) => {
	try {
		const user = await User.findById(req.userId).select("-password");
		if (!user) {
			return res.status(400).json({ success: false, message: "User not found" });
		}

		res.status(200).json({ success: true, user });
	} catch (error) {
		console.log("Error in checkAuth ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};
