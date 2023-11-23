require('dotenv').config();
const cors = require('cors');
const express = require('express');
const userRoute = require('./routes/customer');
const groupRoute = require('./routes/community');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());  
app.use(express.static('public'));

// ROUTES (nimetään taulujen mukaan :) )
app.use('/customer', userRoute);
app.use('/community', groupRoute);


// START SERVER
const PORT = process.env.PORT || 3001;

app.listen(PORT, function() {    
    console.log(`Server is running on port ` + PORT);
});



// GROUPMEMBERSHIPIT:
// 0 = nobody
// 1 = pending
// 2 = member
// 3 = admin