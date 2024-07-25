
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const UserModel = require('./schema');



const handleRegister = async (req, res) => {
  const { name, email, phone, city, password } = req.body;

  const user = await UserModel.findOne({ email });
  if (user) {
    return res.status(400).json({ message: 'Email already exists' });
  }

  const myHashPassword = await bcryptjs.hash(password, 5);

  const newUser = new UserModel({
    name,
    email,
    phone,
    city,
    password:myHashPassword,
  });

  try{
    
    const dbResponse = await UserModel.create(newUser);

    if(!dbResponse){
      return res.status(400).json({ message: 'Error creating user' });
    }else{

      const token = jwt.sign({
        id: dbResponse._id,
        name: dbResponse.name,
        email: dbResponse.email,
      }, process.env.JWT_SECRET)

      res.status(201).json({
        message: 'User created successfully',
        token,
        data: dbResponse
        
      });
      return;
    }



  }catch(err){
    return res.status(500).json({ message: 'Error creating user' });
  }
};

const handleLogin = async (req, res) => {

  const { email, password } = req.body;
  try {

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid Email' });
    }

    const isValid = await bcryptjs.compare(
        password,
        user.password
    );


    if (!isValid) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }


    const token = jwt.sign({
      id: user._id,
      name: user.name,
      email: user.email,
    }, process.env.JWT_SECRET)

    res.status(200).json({
      message: 'Login Successful',
      token,
      data: {
        name:user.name,
        email:user.email,
        city:user.city,
        phone:user.phone
      }
    });

    return;

  } catch (error) {
    return res.status(500).json({ message: 'Error logging in user' });
  }
};


module.exports = {
  handleRegister,
  handleLogin
};