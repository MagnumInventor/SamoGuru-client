// mailing/brevo.config.js
import SibApiV3Sdk from 'sib-api-v3-sdk';

// Налаштування Brevo клієнта
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY;

export const brevoClient = new SibApiV3Sdk.TransactionalEmailsApi();

// Перевірка чи домен верифікований
const isDomainVerified = process.env.DOMAIN_VERIFIED === 'true';

export const sender = {
	name: "SamoGuru",
	// Використовуйте верифікований Gmail до налаштування власного домену
	email: isDomainVerified ? "noreply@samoguru.run.place" : "samoguru.main@gmail.com"
};

// Додатково: функція для логування поточного відправника
export const getCurrentSender = () => {
	console.log(`📧 Current sender: ${sender.email} (Domain verified: ${isDomainVerified})`);
	return sender;
};