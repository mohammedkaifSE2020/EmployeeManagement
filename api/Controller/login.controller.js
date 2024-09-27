import bcryptjs from "bcryptjs"
import Login from "../Model/login.model.js"

//Controller to handle singUp Functionality
export const signUp = async (req, res) => {
    try {
      // take input from request and destructure values 
      const { f_userName, f_Pwd } = req.body;
  
      // Check if both fields are provided
      if (!f_userName || !f_Pwd) {
        return res.json({
          success: false,
          status: 400,
          message: "Both fields are mandatory",
        });
      }
  
      // Validate username (at least 3 characters, only alphanumeric characters allowed)
      const usernameRegex = /^[a-zA-Z0-9_]{5,}$/;
      if (!usernameRegex.test(f_userName)) {
        return res.json({
          success: false,
          status: 400,
          message: "Username must be at least 3 characters long and contain only letters, numbers, or underscores.",
        });
      }
  
      // Validate password (at least 8 characters, must contain uppercase, lowercase, number, and special character)
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(f_Pwd)) {
        return res.json({
          success: false,
          status: 400,
          message: "Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.",
        });
      }
  
      // Encrypt password
      const encryptedPassword = bcryptjs.hashSync(f_Pwd, 8);
  
      // Generate random serial number (6-digit number)
      const min = 100000; // Minimum 6-digit number
      const max = 999999; // Maximum 6-digit number
      const f_sno = Math.floor(Math.random() * (max - min + 1)) + min;
  
      const newUser = new Login({
        f_sno,
        f_userName,
        f_Pwd: encryptedPassword,
      });
  
      // Save the new user
      await newUser.save();
  
      // Prepare user data without password
      const userWithoutPassword = {
        ...newUser._doc,
        f_Pwd: null,
      };
  
      return res.json({
        status: 200,
        success: true,
        message: "Signup Successful",
        data: userWithoutPassword,
      });
  
    } catch (error) {
      console.log("Something went wrong while signing up", error);
      return res.json({
        success: false,
        status: 400,
        message: "Something went wrong while signing up",
      });
    }
};

//Controller to handle Login Functionality
export const login = async (req, res) => {
    try {
      // Destructure values from the request body (username and password)
      const { f_userName, f_Pwd } = req.body;
  
      // Check if both username and password are provided
      if (!f_userName || !f_Pwd) {
        return res.json({
          success: false,
          status: 400,
          message: "Both fields are mandatory",
        });
      }
  
      // Validate the username using a regular expression (at least 5 characters, alphanumeric, underscores allowed)
      const usernameRegex = /^[a-zA-Z0-9_]{5,}$/;
      if (!usernameRegex.test(f_userName)) {
        return res.json({
          success: false,
          status: 400,
          message: "Username must be at least 5 characters long and contain only letters, numbers, or underscores.",
        });
      }
  
      // Validate the password using a regular expression (at least 8 characters, must include uppercase, lowercase, number, and special character)
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(f_Pwd)) {
        return res.json({
          success: false,
          status: 400,
          message: "Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.",
        });
      }
  
      // Find the user by username in the database
      const user = await Login.findOne({ f_userName });
  
      // If no user is found, send an error response
      if (!user) {
        return res.json({
          success: false,
          status: 400,
          message: "Invalid login credentials",
        });
      }
  
      // Compare the provided password with the encrypted password stored in the database
      const dcrptedPassword = bcryptjs.compareSync(f_Pwd, user.f_Pwd);
  
      // If the password doesn't match, send an error response
      if (!dcrptedPassword) {
        return res.json({
          success: false,
          status: 400,
          message: "Invalid password",
        });
      }
  
      // If the login is successful, send a success response with the user data
      res.json({
        success: true,
        status: 200,
        message: "Login successful",
        data: user,
      });
  
    } catch (error) {
      // Catch any errors during the login process and send an error response
      console.log("Something went wrong while logging in", error);
      return res.json({
        success: false,
        status: 400,
        message: "Something went wrong while logging in",
      });
    }
};

//Controller to handle logout
export const logout = async (req,res) => {
  try {
    
  } catch (error) {
    console.log("Something went wrong while logging out")
    res.json({
      status : 400,
      success : false,
      message : "Something went wrong while logging out"
    })
  }
}
  
  