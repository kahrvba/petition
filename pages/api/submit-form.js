import Form from '../../models/Form';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, department, email, goals } = req.body;

        if (!name || !department || !email) {
            return res.status(400).json({ error: 'Name, department, and email are required.' });
        }

        try {
            // Connect to MongoDB
            await connectToDatabase();

            // Save the form data to MongoDB
            const newForm = new Form({
                name,
                department,
                email,
                goals, // Only save goals and user details
            });

            await newForm.save();

            return res.status(200).json({ message: 'Form submitted successfully.' });
        } catch (error) {
            console.error('Error saving form data to MongoDB:', error);
            return res.status(500).json({ error: 'Failed to save form data' });
        }
    } else {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
}
