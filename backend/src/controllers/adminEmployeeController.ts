import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Employee from '../models/Employee';
import z from 'zod';
import Admin from '../models/Admin';
import DailyLocation from '../models/Location'

// Function to generate a random string of given length
const generateRandomString = (length: number): string => {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomString = "";
  for (let i = 0, n = charset.length; i < length; ++i) {
    randomString += charset.charAt(Math.floor(Math.random() * n));
  }
  return randomString;
};

// Function to generate a random password of length 5 to 7
const generatePassword = (): string => {
  const length = Math.floor(Math.random() * 3) + 5; // Generates a length between 5 and 7
  return generateRandomString(length);
};

// Function to generate a random unique ID of length 5 to 7
const generateUniqueId = (): string => {
  const length = Math.floor(Math.random() * 3) + 5; // Generates a length between 5 and 7
  return generateRandomString(length);
};

interface InputSyntax {
  username: string
  mobileNumber: number
}

const inputZodValidation = z.object({
  username: z.string().min(3).max(30),
  mobileNumber: z.string()
  .regex(/^[0-9]{10}$/, "Invalid mobile number")
})

export const registerEmployee = async (req: Request, res: Response) => {
  try {
    const { name, mobileNumber } = req.body;
    const adminId = req.headers.id;

    if (!adminId || !mongoose.Types.ObjectId.isValid(adminId.toString())) {
      return res.status(400).json({ message: "Invalid Admin ID" });
    }

    // Check if employee already exists
    const existingEmployee = await Employee.findOne({ mobileNumber });
    if (existingEmployee) {
      return res.status(400).json({ message: "Employee already exists" });
    }

    // Generate unique ID and password
    const uniqueId = generateUniqueId();
    const password = generatePassword();

    // Create new employee
    const newEmployee = new Employee({
      adminId: new mongoose.Types.ObjectId(adminId.toString()),
      name,
      mobileNumber,
      uniqueId,
      password
    });

    // Save employee to database
    await newEmployee.save();

    // Send response with the new employee's credentials
    res.status(201).json({
      message: "Employee registered successfully",
      employee: {
        uniqueId,
        password
      }
    });
  } catch (error) {
    console.error("Error registering employee:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const showAllEmployees = async (req: Request, res: Response) => {
  try {
    const employees = await Employee.find({}, 'name uniqueId password');

    const employeeDetails = employees.map(employee => ({
      name: employee.name,
      uniqueId: employee.uniqueId,
      password: employee.password 
    }));

    res.status(200).json({
      employees: employeeDetails
    });
  } catch (error) {
    console.error("Error retrieving employees:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export const loggedInAdmin = async (req: Request, res: Response) => {
  try {
    const adminId = req.headers.id;
    const adminName = await Admin.findOne({adminId});
    if(!adminName)
      return res.status(400).json({ message: 'Admin Name not found' });
    res.status(200).send(adminName.adminname);
  } catch(err) {
    res.status(500).json({ message: 'Server error while fetching loged in Admin details', error: (err as Error).message });
  }
}

export const employeeDetails = async (req: Request, res: Response) => {
  try {
      const { uniqueId } = req.query;

      if (!uniqueId) {
        return res.status(400).json({ message: "Unique ID is required" });
      }
      const employee = await Employee.findOne({ uniqueId: uniqueId});

      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
    }
    console.log("neeru in adminEmployeeController " + uniqueId)
    console.log("neeru in adminEmployeeController - " + employee.name)

    return res.status(200).json({
      id : employee.id,
      name: employee.name,
      uniqueId: employee.uniqueId,
      mobileNumber: employee.mobileNumber
  });
  }
  catch(err) {
    res.status(500).json({ message: 'Server error while fetching employee detail.', error: (err as Error).message });
  }
}

export const getLocationHistory = async (req: Request, res: Response) => {
  try {
      const { employeeId, date } = req.query;

      if (!employeeId || !date) {
          return res.status(400).json({ message: 'Employee ID and date are required.' });
      }

      const locationHistory = await DailyLocation.findOne({ employeeId, date }).exec();

      if (!locationHistory) {
          return res.status(404).json({ message: 'No location history found for this date.' });
      }

      return res.json(locationHistory);
  } catch (err) {
      return res.status(500).json({ message: 'Server error', error: (err as Error).message });
  }
};