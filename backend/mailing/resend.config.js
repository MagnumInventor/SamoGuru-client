import { Resend } from 'resend';
import dotenv from "dotenv";

dotenv.config();

export const resendClient = new Resend(process.env.RESEND_API_KEY);

export const sender = {
	email: "noreply@samoguru.run.place",
	name: "SamoGuru",
};