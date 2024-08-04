import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../utils/dbConnect';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const client = await dbConnect;
        const db = client.db('users');
        const collection = db.collection('students');

        // Fetching the collection
        const data = await collection.find({}).toArray();

        // Sending the fetched collection as a response
        res.status(200).json({ success: true, data });
    } catch (error) {
        console.error('Error connecting to the database:', error);
        res.status(500).json({ success: false, error: 'Error connecting to the database' });
    }
}
