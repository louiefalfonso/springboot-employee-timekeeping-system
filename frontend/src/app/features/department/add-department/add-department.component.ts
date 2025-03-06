import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';

import { HeaderComponent } from '../../../core/components/header/header.component';
import { AddDepartmentRequest } from '../models/add-department.models';
import { DepartmentService } from '../services/department.service';

@Component({
  selector: 'app-add-department',
  imports: [RouterModule, CommonModule, HeaderComponent, FormsModule],
  templateUrl: './add-department.component.html',
  styleUrl: './add-department.component.css'
})
export class AddDepartmentComponent implements OnDestroy{

  // add model
  model: AddDepartmentRequest;

  // add unsubcribe from observables
  private addDepartmentSubscription ?: Subscription;

  // add alertMessage and alertType
  alertMessage: string = '';
  alertType: string = '';
 
  // add constructor
  constructor(
    private departmentService: DepartmentService,
    private http: HttpClient, 
    private router: Router) {
    this.model = {
    departmentName: '',
    departmentCode: '',
    departmentHead: '',
    departmentAssistant: '',
    location: '',
    contactNumber: ''
   }
  }

  // add onFormSubmit
  onFormSubmit() {
  this.addDepartmentSubscription =  this.departmentService.addDepartment(this.model)
  .subscribe({
      next: (response) => {
          this.alertMessage = 'Department Added Successfully';
          this.alertType = 'success';
          setTimeout(() => {
            this.alertMessage = '';
            this.alertType = '';
            this.router.navigate(['/departments']);
          }, 3000);
        },
        error: (error) => {
          this.alertMessage = 'Error Adding This Department';
          this.alertType = 'danger';
        }
    });
  }

  // implement onGoBack
  onGoBack(){
    this.router.navigate(['/departments']);
  }

 // onDestroy
  ngOnDestroy(): void {
    this.addDepartmentSubscription?.unsubscribe();
  }

}
