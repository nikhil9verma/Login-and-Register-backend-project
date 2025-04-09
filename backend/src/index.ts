import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true
}));

app.use('/api/auth',authRoutes);

app.use((err:any,req:express.Request,res:express.Response,next:express.NextFunction)=>{
    console.error(err);
    res.status(err.status || 500).json({
        status:'error',
        message: err.message || 'Internal Server Error'
    });
});

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
})

