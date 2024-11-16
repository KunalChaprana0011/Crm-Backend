import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv" 
import bodyParser from "body-parser";
import { DB_NAME } from "./constants.js";
import cors from "cors"



dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(cors()); 

mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error(err));

import userRouter from "./routes/user.contacts.js"

app.use('/api/contacts', userRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));