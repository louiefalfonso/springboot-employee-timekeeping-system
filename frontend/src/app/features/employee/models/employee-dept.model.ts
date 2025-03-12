import { Employee } from "./employee.models";

 export interface EmployeeWithDepartment extends Employee {
  departmentName: string;
}