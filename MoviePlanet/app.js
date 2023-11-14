require('dotenv').config();
const cors = require('cors');
const express = require('express');
const userRoute = require('./routes/customer');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());  
app.use(express.static('public'));

// ROUTES
app.use('/customer', userRoute);


// START SERVER
const PORT = process.env.PORT || 3001;

app.listen(PORT, function() {    
    console.log(`Server is running on port ` + PORT);
});