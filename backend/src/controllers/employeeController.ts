import { Request, Response } from 'express';
import Employee from '../models/Employee';

export const employeeTestRoute = async (req: Request, res: Response) => {
    res.send("Employee Controller Working fine")
}

export const employeeId = async (req: Request, res: Response) => {
    const employeeId = req.headers["id"];
    res.send(employeeId);
}

export const employeeDetailsForEmployees = async (req: Request, res: Response) => {
    try {
        const { uniqueId } = req.query;
  
        if (!uniqueId) {
          return res.status(400).json({ message: "Unique ID is required" });
        }
        const employee = await Employee.findOne({ uniqueId: uniqueId});
  
        if (!employee) {
          return res.status(404).json({ message: "Employee not found" });
      }
      console.log("neeru in employeeController " + uniqueId)
      console.log("neeru in employeeController - " + employee.name)
  
      return res.status(200).json({
        id : employee.id,
        name: employee.name,
    });
    }
    catch(err) {
      res.status(500).json({ message: 'Server error while fetching employee details for employee.', error: (err as Error).message });
    }
}