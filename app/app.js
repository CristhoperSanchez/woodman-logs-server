import express, { application } from 'express';
import dotenv from 'dotenv';
import DB from './data/database.js';


dotenv.config()
const {
  PORT
} = process.env


const APP = express();
APP.use(express.json());



APP.post('/logging/addlog', (req, res) =>{
  console.log("Logging request Detected: ", req.body);
  DB.InsertLog(req.body);
  res.status(200).send("That worked :)")
})



APP.get('/loggingstructure', (req, res) =>{
  res.json({
    "application" : "text",
    "environment" : "text",
    "statusCode"  : "int",
    "level"  : "text ( fatal, error, warn, info, debug, trace )",
    "status" : "text",
    "stack"  : "text",
    "message" : "text",
    "date": "date"
  })
})

APP.listen(PORT, () => {
  console.clear();
  console.log("App Listening on Port: ", PORT)
})
