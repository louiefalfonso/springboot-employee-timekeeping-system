export interface AddEmployeeRequest {
  firstName: string;
  lastName: string;
  employeeNumber: string;
  position: string;
  emailAddress: string;
  phoneNumber: string;
  employeeStatus : string;
  dateOfBirth: Date;
  departments: string[];
}