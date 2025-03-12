import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { combineLatest, map, Observable } from 'rxjs';

import { HeaderComponent } from '../../../core/components/header/header.component';
import { Employee } from '../models/employee.models';
import { EmployeeService } from '../services/employee.service';
import { Department } from '../../department/models/department.models';
import { DepartmentService } from '../../department/services/department.service';
import { EmployeeWithDepartment } from '../models/employee-dept.model';

@Component({
  selector: 'app-employee-list',
  imports: [RouterModule, CommonModule, HeaderComponent],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit {

  // add a property to hold the list of employees
  employees$?: Observable<Employee[]>;
  departments$? : Observable<Department[]>
  employeesWithDepartments$?: Observable<EmployeeWithDepartment[]>;

  // add constructor
  constructor(
    private employeeService: EmployeeService,
    private departmentService: DepartmentService
  ) { }

  // implement ngOnInit
  ngOnInit(): void {
    this.departments$ = this.departmentService.getAllDepartments();
    this.employees$ = this.employeeService.getAllEmployees();

    
  }

 
}
