import dotenv from 'dotenv';
import { google } from 'googleapis';
import winston from 'winston';

// Load environment variables from .env file
dotenv.config();

// Set up logging
const logger = winston.createLogger({
    level: 'error',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'error.log' }), // Log errors to a file
    ],
});

// Retrieve environment variables
const keyFilePath = process.env.GOOGLE_CLIENT_SECRET_PATH;
const spreadsheetId = process.env.GOOGLE_SHEET_ID;

// Define the necessary scope for Google Sheets API
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const range = 'Sheet1!A:D'; // Adjust the range as needed

// Initialize Google Auth client using Service Account credentials
const auth = new google.auth.GoogleAuth({
    keyFile: keyFilePath, // Path to your Service Account JSON credentials file
    scopes: SCOPES,
});

// Initialize Google Sheets API client
const sheets = google.sheets('v4');

// Function to append data to Google Sheets
export async function appendToGoogleSheet(data) {
    try {
        const authClient = await auth.getClient();
        const resource = {
            values: [data],
        };

        const response = await sheets.spreadsheets.values.append({
            spreadsheetId,
            range,
            valueInputOption: 'RAW',
            resource,
            auth: authClient,
        });

        return response.data;
    } catch (err) {
        logger.error(err);
        throw new Error('Failed to save data to Google Sheets');
    }
}
