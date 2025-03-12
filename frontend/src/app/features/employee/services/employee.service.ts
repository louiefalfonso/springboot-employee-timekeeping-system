import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Employee } from '../models/employee.models';
import { environment } from '../../../../environments/environment';
import { AddEmployeeRequest } from '../models/add-employee.models';
import { UpdateEmployeeRequest } from '../models/update-employee.models';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient,) { }

  addEmployee(model: AddEmployeeRequest) : Observable<Employee>{
    return this.http.post<Employee>(`${environment.apiBaseUrl}/employees`, model);
  }

  getAllEmployees(): Observable<Employee[]>{
    return this.http.get<Employee[]>(`${environment.apiBaseUrl}/employees`);
  }

  getEmployeeById(id: string) : Observable<Employee>{
    return this.http.get<Employee>(`${environment.apiBaseUrl}/employees/${id}`);
  }

  updateEmployee(id: string, updateEmployeeRequest : UpdateEmployeeRequest): Observable<Employee>{
    return this.http.put<Employee>(`${environment.apiBaseUrl}/employees/${id}`, updateEmployeeRequest);
  }

  deleteEmployee(id: string) : Observable<Employee>{
    return this.http.delete<Employee>(`${environment.apiBaseUrl}/employees/${id}`);
  }
}
