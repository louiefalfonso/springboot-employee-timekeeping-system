import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { HeaderComponent } from '../../../core/components/header/header.component';
import { AddEmployeeRequest } from '../models/add-employee.models';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-add-employee',
  imports: [RouterModule, CommonModule, HeaderComponent, FormsModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent implements OnDestroy {

  // add model
  model : AddEmployeeRequest;

  // add alertMessage and alertType
  alertMessage: string = '';
  alertType: string = '';


  // add constructor
  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {
    this.model = {
      firstName: '',
      lastName: '',
      employeeNumber: '',
      positon: '',
      emailAddress: '',
      phoneNumber: '',
      employeeStatus : '',
      dateOfBirth: '',
      departments: []
     }
  }

  // add onFormSubmit
  onFormSubmit() {
    this.employeeService.addEmployee(this.model).subscribe({
      next: (response) => {
          this.alertMessage = 'Employee Added Successfully';
          this.alertType = 'success';
          setTimeout(() => {
            this.alertMessage = '';
            this.alertType = '';
            this.router.navigate(['/employees']);
          }, 3000);
        },
        error: (error) => {
          this.alertMessage = 'Error Adding The Employee';
          this.alertType = 'danger';
        }
    })
  }


  // implement onGoBack
  onGoBack(){
    this.router.navigate(['/employees']);
  }

  // onDestroy
  ngOnDestroy(): void {
  }
}
