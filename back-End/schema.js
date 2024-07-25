
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,

  },
  email: {
    type: String,
    unique: true,
  },
  phone: {
    type: String,

  },
  city: {
    type: String,

  },
  password: {
    type: String,
  
  },
});

const propertySchema = new mongoose.Schema({
  type: {
    type: String,
  },
  location: {
    type: String,
  },
  city: {
    type: String,
   },
 price: {
     type: Number, 
    }
});

const userModel=mongoose.model('user',userSchema);
const propertyModel=mongoose.model('property',propertySchema);

module.exports={
    userModel,
    propertyModel
};