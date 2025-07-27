import {
	PASSWORD_RESET_REQUEST_TEMPLATE,
	PASSWORD_RESET_SUCCESS_TEMPLATE,
	VERIFICATION_EMAIL_TEMPLATE,
} from "./emailTemplates.js";
import { resendClient, sender } from "./resend.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
	try {
		const response = await resendClient.emails.send({
			from: `${sender.name} <${sender.email}>`,
			to: [email],
			subject: "Підтвердіть вашу пошту - SamoGuru",
			html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
			tags: [
				{
					name: "category",
					value: "email_verification"
				}
			]
		});

		console.log("Email sent successfully", response);
		return response;
	} catch (error) {
		console.error(`Error sending verification`, error);
		throw new Error(`Error sending verification email: ${error}`);
	}
};

export const sendWelcomeEmail = async (email, name) => {
	try {
		const welcomeTemplate = `
			<!DOCTYPE html>
			<html lang="uk">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>Ласкаво просимо до SamoGuru</title>
			</head>
			<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
				<div style="background: linear-gradient(to right, #10b981, #059669); padding: 20px; text-align: center;">
					<h1 style="color: white; margin: 0;">🎉 Ласкаво просимо до SamoGuru!</h1>
				</div>
				<div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
					<p>Привіт, <strong>${name}</strong>!</p>
					<p>Вітаємо з успішною реєстрацією на платформі SamoGuru!</p>
					<div style="text-align: center; margin: 30px 0;">
						<div style="background-color: #10b981; color: white; width: 80px; height: 80px; line-height: 80px; border-radius: 50%; display: inline-block; font-size: 40px;">
							🎯
						</div>
					</div>
					<p>Тепер ви можете використовувати всі можливості платформи для підвищення своєї продуктивності.</p>
					<div style="text-align: center; margin: 30px 0;">
						<a href="https://www.samoguru.run.place" style="background-color: #10b981; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Перейти до роботи</a>
					</div>
					<p>Якщо у вас виникнуть питання, не соромтеся звертатися до нашої служби підтримки.</p>
					<p>Успіхів у досягненні ваших цілей!</p>
					<p>З найкращими побажаннями,<br>Команда SamoGuru</p>
				</div>
				<div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
					<p>Це автоматичне повідомлення, будь ласка, не відповідайте на цей лист.</p>
				</div>
			</body>
			</html>
		`;

		const response = await resendClient.emails.send({
			from: `${sender.name} <${sender.email}>`,
			to: [email],
			subject: "Ласкаво просимо до SamoGuru! 🎉",
			html: welcomeTemplate,
			tags: [
				{
					name: "category",
					value: "welcome_email"
				}
			]
		});

		console.log("Welcome email sent successfully", response);
		return response;
	} catch (error) {
		console.error(`Error sending welcome email`, error);
		throw new Error(`Error sending welcome email: ${error}`);
	}
};

export const sendPasswordResetEmail = async (email, resetURL) => {
	try {
		const response = await resendClient.emails.send({
			from: `${sender.name} <${sender.email}>`,
			to: [email],
			subject: "Скидання пароля - SamoGuru",
			html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
			tags: [
				{
					name: "category",
					value: "password_reset"
				}
			]
		});

		console.log("Password reset email sent successfully", response);
		return response;
	} catch (error) {
		console.error(`Error sending password reset email`, error);
		throw new Error(`Error sending password reset email: ${error}`);
	}
};

export const sendResetSuccessEmail = async (email) => {
	try {
		const response = await resendClient.emails.send({
			from: `${sender.name} <${sender.email}>`,
			to: [email],
			subject: "Пароль успішно скинуто - SamoGuru",
			html: PASSWORD_RESET_SUCCESS_TEMPLATE,
			tags: [
				{
					name: "category",
					value: "password_reset_success"
				}
			]
		});

		console.log("Password reset success email sent successfully", response);
		return response;
	} catch (error) {
		console.error(`Error sending password reset success email`, error);
		throw new Error(`Error sending password reset success email: ${error}`);
	}
};