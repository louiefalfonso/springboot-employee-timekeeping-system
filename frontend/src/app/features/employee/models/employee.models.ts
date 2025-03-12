import { Department } from "../../department/models/department.models";

export interface Employee{
  id: string;
  firstName: string;
  lastName: string;
  employeeNumber: string;
  position: string;
  emailAddress: string;
  phoneNumber: string;
  employeeStatus : string;
  dateOfBirth: Date;
  departments: Department[]
}
