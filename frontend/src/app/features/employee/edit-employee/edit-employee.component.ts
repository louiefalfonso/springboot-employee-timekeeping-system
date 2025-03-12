import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable, Subscription } from 'rxjs';


import { HeaderComponent } from '../../../core/components/header/header.component';
import { Employee } from '../models/employee.models';
import { EmployeeService } from '../services/employee.service';
import { UpdateEmployeeRequest } from '../models/update-employee.models';
import { Department } from '../../department/models/department.models';
import { DepartmentService } from '../../department/services/department.service';
import { response } from 'express';
import { console } from 'node:inspector';


@Component({
  selector: 'app-edit-employee',
  imports: [RouterModule, FormsModule, CommonModule,HeaderComponent],
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.css'
})

export class EditEmployeeComponent implements OnInit, OnDestroy {
  
  // add id property
   id : string | null = null;
   model?: Employee;
   departments$?: Observable<Department[]>;
   selectedDepartments?: string[];

  // add employee object
  employee?: Employee;

  // add subscriptions
  routeSubscription?: Subscription;
  getEmployeeSubscription?: Subscription;
  updateEmployeeSubscription?: Subscription;
  deleteEmployeeSubscription?: Subscription;

  // add alertMessage and alertType
  alertMessage: string = '';
  alertType: string = '';

  // add constructor and inject the necessary services
  constructor(
     private router: Router,
     private route : ActivatedRoute,
     private employeeService: EmployeeService,
     private departmentService: DepartmentService
  ) { }

  // implement ngOnInit
  ngOnInit(): void {

   //get all departments 
   this.departments$ = this.departmentService.getAllDepartments();

   // get all ID of the employee to edit
   this.routeSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');
        if(this.id){
         this.getEmployeeSubscription = this.employeeService.getEmployeeById(this.id).subscribe({
            next: (response) => {
              this.model = response;
              this.selectedDepartments = response.departments?.map(x => x.id) ?? [];
            }
          })
        }
      }
    })
  }

  // implement onFormSubmit
  onFormSubmit(): void {
    // convert this model to request model
    if (this.model && this.id) {
      var updateEmployee: UpdateEmployeeRequest = {
        firstName: this.model.firstName,
        lastName: this.model.lastName,
        employeeNumber: this.model.employeeNumber,
        position: this.model.position,
        emailAddress: this.model.emailAddress,
        phoneNumber: this.model.phoneNumber,
        employeeStatus: this.model.employeeStatus,
        dateOfBirth: this.model.dateOfBirth,
        departments: this.selectedDepartments??[]
      };
      this.updateEmployeeSubscription = this.employeeService.updateEmployee(this.id, updateEmployee).subscribe({
        next: (response) => {
          this.alertMessage = 'Employee Updated Successfully';
          this.alertType = 'success';
          setTimeout(() => {
            this.alertMessage = '';
            this.alertType = '';
            this.router.navigate(['/employees']);
          }, 2000);
        },
        error: (error) => {
          console.error(error);
          this.alertMessage = 'An error occurred while updating the Department'
          this.alertType = 'danger';
          setTimeout(() => {
            this.alertMessage = '';
            this.alertType = '';
            this.router.navigate(['/employees']);
          }, 2000);
        }
      });
    }
  }

   // implement onGoBack
  onGoBack(): void{
    this.router.navigate(['/employees']);
  }

   // implement onDelete
   onDelete(): void{
    if(this.id){
       this.deleteEmployeeSubscription = this.employeeService.deleteEmployee(this.id).subscribe({
        next:(response) =>{
          this.router.navigateByUrl('/employees');
        }
      })
    }
   }

  // implement ngOnDestroy
  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.getEmployeeSubscription?.unsubscribe();
    this.updateEmployeeSubscription?.unsubscribe();
    this.deleteEmployeeSubscription?.unsubscribe();
  }

}
