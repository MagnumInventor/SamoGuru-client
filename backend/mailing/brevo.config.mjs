// brevo.config.js - Версія з fetch (без SDK)
const BREVO_API_URL = 'https://api.brevo.com/v3';

// Перевірка чи домен верифікований
const isDomainVerified = process.env.DOMAIN_VERIFIED === 'true';

export const sender = {
	name: "SamoGuru",
	email: isDomainVerified ? "noreply@samoguru.run.place" : "samoguru.main@gmail.com"
};

// Функція для відправки email через REST API
export const sendBrevoEmail = async (emailData) => {
	try {
		const response = await fetch(`${BREVO_API_URL}/smtp/email`, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'api-key': process.env.BREVO_API_KEY
			},
			body: JSON.stringify(emailData)
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(`Brevo API Error: ${response.status} - ${JSON.stringify(errorData)}`);
		}

		const result = await response.json();
		return result;
	} catch (error) {
		console.error('Brevo API request failed:', error);
		throw error;
	}
};
