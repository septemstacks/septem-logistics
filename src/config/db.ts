import { connect, Mongoose } from 'mongoose';

export const connectDB = async () => {
    try {
        const conn: Mongoose = await connect(`${process.env.MONGO_URI}`, {
            autoCreate: true,
            autoIndex: true
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};