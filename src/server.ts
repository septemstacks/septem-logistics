import { connectDB } from './config/db';

import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import colors from 'colors';
// @ts-ignore
import secure from 'express-force-https';
import fileUpload from 'express-fileupload';

import './controllers/';

import { AppRouter } from './AppRouter';

// Load environment variables via config.env if in development mode
if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

// Connect database
connectDB();

const app: Application = express();

app.use(secure);
app.use(cors());
// app.options('*', cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: '/tmp/',
        // createParentPath: true,
        safeFileNames: true,
        preserveExtension: true,
        abortOnLimit: true,
        limits: {
            fileSize: 5 * 1024 * 1024,
        },
        limitHandler: (_: Request, res: Response) => {
            return res.status(413).json({
                success: false,
                errors: { msg: 'Image too large. Maximum size 5MB!' }
            });
            // next();
        },
    })
);

app.use(AppRouter.getInstance());
app.use(morgan('dev'));
    
const PORT = process.env.PORT || 4001;
const server = app.listen(PORT, () => console.log(colors.blue(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)));

interface Error {
    message: string;
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
    console.error(err)
    console.log(colors.red(`Error: ${err.message}`));
    // Close server and exit process
    server.close(() => process.exit(10));
});