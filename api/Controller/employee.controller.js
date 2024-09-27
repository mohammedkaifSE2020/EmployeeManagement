import Employee from "../Model/employee.model.js";
import { uploadCloudinary } from "../Utils/cloudinary.middleware.js";

export const createEmployee = async (req, res) => {
  try {
    // Destructure fields from the request body
    const { f_Name, f_Email, f_Mobile, f_Designation, f_gender, f_Course } = req.body;
    
    //Handle Image Upload
    const imageDetails = req.file;
    const imageLocalPath = imageDetails.path;
    const response = await uploadCloudinary(imageLocalPath);
    const f_Image = response.secure_url;


    // Check if all fields are provided
    if (!f_Image || !f_Name || !f_Email || !f_Mobile || !f_Designation || !f_gender || !f_Course) {
      return res.json({
        success: false,
        status: 400,
        message: "All fields are mandatory",
      });
    }

    // Email validation: Check if the email is in valid format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple regex to validate email format
    if (!emailRegex.test(f_Email)) {
      return res.json({
        success: false,
        status: 400,
        message: "Invalid email format. Please provide a valid email address.",
      });
    }

    // Check for duplicate email in the database
    const userWithSameEmail = await Employee.findOne({ f_Email });
    if (userWithSameEmail) {
      return res.json({
        success: false,
        status: 400,
        message: "Email already taken. Please use another email address.",
      });
    }

    // Generate a random serial number (4-digit number) for the employee ID
    const min = 1000; // Minimum 4-digit number
    const max = 9999; // Maximum 4-digit number
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

    // Create a unique employee ID by appending a random number to the prefix
    const employeeIdPrefix = "DealsDray";
    const f_Id = `${employeeIdPrefix}${randomNumber}`;

    // Create a new employee document using the provided details
    const newEmployee = new Employee({
      f_Id,
      f_Image,
      f_Name,
      f_Email,
      f_Mobile,
      f_Designation,
      f_gender,
      f_Course
    });

    // Save the new employee to the database
    await newEmployee.save();

    // Send a successful response along with the saved employee data
    res.json({
      status: 200,
      success: true,
      message: "Employee details saved successfully",
      data: newEmployee // Include the saved employee details in the response
    });

  } catch (error) {
    // Log any errors and send an error response
    console.error("Something went wrong while saving the employee record:", error);
    return res.json({
      status: 400,
      success: false,
      message: "Something went wrong while saving the employee record",
    });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    // Extract employee id from the request body
    const id = req.params.id;

    // Check if the employee exists in the database using the provided id
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.json({
        status: 404,
        success: false,
        message: "Employee not found",
      });
    }

    // Delete the employee record from the database using the id
    await Employee.findByIdAndDelete(id);

    // Send success response
    res.json({
      status: 200,
      success: true,
      message: "Employee deleted successfully",
    });
  } catch (error) {
    // Log the error and send a failure response
    console.error("Something went wrong while deleting the employee record:", error);
    return res.json({
      status: 400,
      success: false,
      message: "Something went wrong while deleting the employee record",
    });
  }
};

export const updateEmployee = async (req, res) => {
    try {
      // Extract employee email from the request body
      const { f_Email, f_Name, f_Mobile, f_Designation, f_gender, f_Course } = req.body;
      
      const id = req.params.id;
      
      // Check if the employee exists in the database using the provided email
      const employee = await Employee.findById( id );
      if (!employee) {
        return res.json({
          status: 404,
          success: false,
          message: "Employee not found",
        });
      }
  
      let imageUrl;
      // Handle image update if a new image file is provided
      if (req.file) {
        const imageDetails = req.file;
        const imageLocalPath = imageDetails.path;
        const response = await uploadCloudinary(imageLocalPath);
        imageUrl = response.secure_url;
      }
  
      // Build the update object by only including fields that are provided
      const updateFields = {
        ...(f_Email && { f_Email }),
        ...(f_Name && { f_Name }),
        ...(f_Mobile && { f_Mobile }),
        ...(f_Designation && { f_Designation }),
        ...(f_gender && { f_gender }),
        ...(f_Course && { f_Course }),
        ...(imageUrl && { f_Image: imageUrl })
      };
  
      // If no fields are being updated, return an error
      if (Object.keys(updateFields).length === 0) {
        return res.json({
          status: 400,
          success: false,
          message: "No fields provided for update",
        });
      }
  
      // Update the employee record with the new details
      const updatedEmployee = await Employee.findByIdAndUpdate(
         id ,  // Find employee by id
        updateFields, // Only update the fields that are provided
        { new: true } // Return the updated document
      );
  
      // Send success response with the updated employee data
      res.json({
        status: 200,
        success: true,
        message: "Employee updated successfully",
        data: updatedEmployee,
      });
    } catch (error) {
      // Log the error and send a failure response
      console.error("Something went wrong while updating the employee record:", error);
      return res.json({
        status: 400,
        success: false,
        message: "Something went wrong while updating the employee record",
      });
    }
};

export const getAllEmployees = async (req, res) => {
    try {
        // Find all employees in the collection
        const employees = await Employee.find();  // Empty find() returns all documents

        // Check if there are employees in the collection
        if (employees.length === 0) {
            return res.json({
                status: 404,
                success: false,
                message: "No employees found",
            });
        }

        // Send back the list of employees
        res.json({
            status: 200,
            success: true,
            message: "Employees fetched successfully",
            data: employees
        });
    } catch (error) {
        console.error("Something went wrong while fetching employees:", error);
        return res.json({
            status: 400,
            success: false,
            message: "Something went wrong while fetching employees",
        });
    }
};


