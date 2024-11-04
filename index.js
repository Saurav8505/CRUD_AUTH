const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const couponRoutes = require('./routes/couponRoutes');




// Middleware to parse JSON requests
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// MongoDB connection
// const mongoURL = "mongodb://localhost:27017/crud1";
const mongoURL = "mongodb+srv://sauravrop:manager@cluster0.hbykt.mongodb.net/"

mongoose
  .connect(mongoURL, {
    //    useNewUrlParser:true,
    //   useUnifiedTopology: true
  })
  .then(() => console.log("MongoDB Connected!"))
  .catch((err) => console.error(err));
  app.get('/', function (req, res) {
    res.send('Welcome');
  });

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/coupons', couponRoutes);

// Start the server
app.listen(3002, () => {
  console.log("Server is running on port 3002");
});