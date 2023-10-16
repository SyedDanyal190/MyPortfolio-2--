const mongoose = require("mongoose");

mongoose.connect( process.env.MONGODB_URI ,{

  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB');
    // Perform database operations
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB', error);
  })

  const employeeSchema =  mongoose.Schema({
    name           : String,
    email          : String,
    etype          : String,
    hourlyrate   : Number,
    totalHour      : Number,
    photo : String,
    totalAmount  : Number,
});

const employeeModel = mongoose.model("Dashboard",employeeSchema);
module.exports = employeeModel;