import * as validator from 'validator';
import { appendToGoogleSheet } from '../../lib/google'; // Adjusted path to the lib folder

export default async function handler(req, res) {
    if (req.method === 'POST') {
        // Validate and sanitize the data from the request body
        const sanitizedData = {
            name: validator.escape(req.body.name),
            department: validator.escape(req.body.department),
            email: validator.isEmail(req.body.email) ? req.body.email : '',
            goals: req.body.goals || {},
        };

        // After validation
        const goalsArray = Object.keys(sanitizedData.goals).filter(key => sanitizedData.goals[key]);
        const goals = goalsArray.join(', '); // Join selected goals into a single string

        // Prepare data for Google Sheets
        const googleSheetData = [
            sanitizedData.name,
            sanitizedData.department,
            sanitizedData.email,
            goals,
        ];

        // Append to Google Sheets
        try {
            await appendToGoogleSheet(googleSheetData);
            res.status(200).json({ success: true, message: 'Form submitted successfully!' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to save data to Google Sheets' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
