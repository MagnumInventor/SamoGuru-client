import { MailtrapClient } from 'mailtrap';
import dotenv from 'dotenv';

dotenv.config();

const TOKEN = process.env.MAILTRAP_DEMO_API_KEY;

const client = new MailtrapClient({
  token: TOKEN,
});

const sender = {
  email: "hello@samoguru.run.place",
  name: "Mailtrap Test",
};
const recipients = [
  {
    email: "markoleks08@gmail.com",
  }
];

client
  .send({
    from: sender,
    to: recipients,
    subject: "You are awesome!",
    text: "Congrats for sending test email with Mailtrap!",
    category: "Integration Test",
  })
  .then(console.log)
  .catch(console.error);
