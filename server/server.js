import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDb from './db/connect.js';
import router from './routes/routes.js';
import hospitalRouter from "./routes/hospitalRoutes.js";
import noticeRouter from "./routes/NoticeRoutes.js"; // Import noticeRouter

dotenv.config();
connectDb();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/user', router);
app.use("/api/hospitals", hospitalRouter);
app.use("/api/notices", noticeRouter); // Add notice routes

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server running on port ${PORT}`));