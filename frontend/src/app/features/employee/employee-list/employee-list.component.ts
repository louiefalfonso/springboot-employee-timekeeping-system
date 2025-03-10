import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

import { HeaderComponent } from '../../../core/components/header/header.component';
import { Employee } from '../models/employee.models';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee-list',
  imports: [RouterModule, CommonModule, HeaderComponent],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit {

  // add a property to hold the list of employees
  employees$?: Observable<Employee[]>;

  // add constructor
  constructor(private employeeService: EmployeeService) { }

  // implement ngOnInit
  ngOnInit(): void {
    this.employees$ = this.employeeService.getAllEmployees();
  }
 
}
