import express from 'express';
import connectDb from './config/dbConfig.js';
import { PORT } from './config/serverConfig.js';
import cors from 'cors';
import apiRoutes from './routes/apiRoutes.js';
import cookieParser from "cookie-parser";
const app = express();
// ✅ CORS Setup (for local + live frontend)
app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "vloging-production.up.railway.app"
        ],
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

// ✅ Middleware to accept different data types
app.use(express.json()); // application/json
app.use(express.urlencoded({ extended: true })); // application/x-www-form-urlencoded
app.use(express.text()); // text/plain
app.use(cookieParser());

// ✅ Routes

// ✅ API routes
app.use('/api', apiRoutes);

// ✅ Vlogging check route
app.use('/', (req, res) => {
    res.send('Welcome to Vlogging API');
});

// ✅ Start server
app.listen(PORT, async() => {
    await connectDb();
    console.log(`🚀 Server running on port ${PORT}`);
});