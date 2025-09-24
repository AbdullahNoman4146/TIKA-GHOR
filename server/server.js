import dotenv from "dotenv";
dotenv.config({ path: './.env' });

import express from 'express';
import cors from 'cors';
import connectDb from './db/connect.js';
import router from './routes/routes.js';
import hospitalRouter from "./routes/hospitalRoutes.js";
import noticeRouter from "./routes/NoticeRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";

connectDb();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/user', router);
app.use("/api/hospitals", hospitalRouter);
app.use("/api/notices", noticeRouter);
app.use("/api/appointments", appointmentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
