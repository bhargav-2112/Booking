import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import authRoute from './routes/auth.route.js';
import hotelRoute from './routes/hotels.route.js';
import roomRoute from './routes/rooms.route.js';
import userRoute from './routes/users.route.js';

const app = express();
dotenv.config();

const connect = async() => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log('MongoDB Connected');
    } catch (err) {
        throw err;
    }
};

mongoose.connection.on("disconnected", ()=> {
    console.log("MongoDB Disconnected");
})

// middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/hotels', hotelRoute);
app.use('/api/rooms', roomRoute);
app.use('/api/users', userRoute);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
      stack: err.stack,
    });
  });

app.listen(8800, () => {
    connect();
    console.log(`Server started`);
});