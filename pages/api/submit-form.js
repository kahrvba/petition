import * as validator from 'validator';
import { appendToGoogleSheet } from '../../lib/google';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const sanitizedData = {
            name: validator.escape(req.body.name),
            department: validator.escape(req.body.department),
            email: validator.isEmail(req.body.email) ? req.body.email : '',
            goals: req.body.goals || {},
        };

        if (!sanitizedData.email) {
            return res.status(400).json({ error: 'Invalid email address' });
        }

        const goalsArray = Object.keys(sanitizedData.goals).filter(key => sanitizedData.goals[key]);
        const goals = goalsArray.join(', ');

        const googleSheetData = [
            sanitizedData.name,
            sanitizedData.department,
            sanitizedData.email,
            goals,
        ];

        try {
            console.log('Sanitized data for Google Sheets:', googleSheetData);
            await appendToGoogleSheet(googleSheetData);
            res.status(200).json({ success: true, message: 'Form submitted successfully!' });
        } catch (error) {
            console.error('Error in Google Sheets API:', error.message);
            res.status(500).json({ error: 'Failed to save data to Google Sheets' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
