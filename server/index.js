import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import contentRoutes from './routes/contentRoutes.js';
import userRoutes from './routes/postRoutes.js';
import { errHandler, notFound } from './middleware/error.js';