import dotenv from 'dotenv';
import { google } from 'googleapis';
import winston from 'winston';

dotenv.config();

// Logging setup
const logger = winston.createLogger({
    level: 'error',
    format: winston.format.json(),
    transports: [new winston.transports.File({ filename: 'error.log' })],
});

// Environment variables
const private_key = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
const client_email = process.env.GOOGLE_CLIENT_EMAIL;
const spreadsheetId = process.env.GOOGLE_SHEET_ID;

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const range = 'Sheet1!A:D';

const auth = new google.auth.GoogleAuth({
    credentials: {
        client_email,
        private_key,
    },
    scopes: SCOPES,
});

const sheets = google.sheets('v4');

export async function appendToGoogleSheet(data) {
    try {
        const authClient = await auth.getClient();
        const resource = { values: [data] };

        const response = await sheets.spreadsheets.values.append({
            spreadsheetId,
            range,
            valueInputOption: 'RAW',
            resource,
            auth: authClient,
        });

        console.log('Successfully appended data:', response.data);
        return response.data;
    } catch (err) {
        logger.error('Error appending to Google Sheets:', err.stack || err.message);
        throw new Error('Failed to save data to Google Sheets');
    }
}
