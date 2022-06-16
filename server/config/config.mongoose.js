const mongoose = require('mongoose');

mongoose.connect ("mongodb://localhost:27017/productdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connection to database Established"))
.catch(err => console.log("Something went wrong when connecting to the database", err));