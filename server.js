const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Change this line

const app = express();
const cors = require('cors');
app.use(cors({origin: true, credentials: true}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://mongo:27017/react-login-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const User = mongoose.model('User', {
  username: String,
  email: String,
  password: String,
});

// User Login
app.post('/user/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Successful login
    res.status(200).json({ message: 'Login successful', user: { email: user.email, username: user.username } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// User Registration
app.post('/user/register', async (req, res) => {
  const { username, email, password } = req.body;
  console.log("in register")
  try {
    // Check if email is already registered
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    // Hash the password using bcryptjs
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    // Successful registration
    res.status(201).json({ message: 'Registration successful', user: { email, username } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});
