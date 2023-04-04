const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
require('dotenv').config();
const PORT = 1200;
const app = express();
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');
const authorizedAdminRoutes = require('./routes/authorized_admin');
const vehicleRoutes = require('./routes/vehicle');
const orderRoutes = require('./routes/order');

app.use(morgan('dev'));

// is used for parsing json
app.use(express.json());

// Send UI from the server
app.use(express.static('public'));

mongoose.connect(process.env.MONGODB_URL).then((response) => {
    console.log(`Database Connected`);
}).catch((error) => {
    console.log(`There was an error` + error);
})

app.use('/api/v1/admins', adminRoutes);
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/authorized_admins', authorizedAdminRoutes)
app.use('/api/v1/vehicles', vehicleRoutes)
app.use('/api/v1/orders', orderRoutes)




app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})