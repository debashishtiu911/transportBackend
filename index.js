const express = require('express');
const bodyParser = require('body-parser');
const mongoose=require("mongoose");
require('dotenv').config()

const app = express();
const port = process.env.PORT || 5001;
const truckRoutes = require('./routes/truckRoutes');
const consignment = require('./routes/consignment1');
const reportRoutes = require('./routes/reportRoutes');
const consignmenttracking = require('./routes/consignmenttracking');
const branchofficeroutes = require('./routes/branchofficeroutes');
app.use(bodyParser.urlencoded({ extended: true }));
const db=require('./database');
const path =require('path');
const Truck = require('./models/truckmodel');

//import cors from 'cors'
const cors=require("cors")
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());

app.use(bodyParser.json());
// Middleware to use routes
app.use('/api/branch-offices', branchofficeroutes);
app.use('/api/consignment',consignment);
 app.use('/api/consignmentreports',consignmenttracking);
app.use('/api/reports',reportRoutes);
app.use('/api/trucks', truckRoutes);




app.listen(port, () => console.log(`Server running on port ${port}`));
