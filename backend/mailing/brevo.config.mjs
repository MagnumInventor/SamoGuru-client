// brevo.config.js
import SibApiV3Sdk from 'sib-api-v3-sdk';

// Налаштування Brevo клієнта
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY; // Ваш API ключ з Brevo

export const brevoClient = new SibApiV3Sdk.TransactionalEmailsApi();

export const sender = {
	name: "SamoGuru",
	email: "noreply@yourdomain.com" // Ваш верифікований домен
};