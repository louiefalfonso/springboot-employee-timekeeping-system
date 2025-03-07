import { Component, OnDestroy, OnInit } from '@angular/core';
import { catchError, Subscription, throwError } from 'rxjs';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'

import { DepartmentService } from '../services/department.service';
import { Department } from '../models/department.models';
import { UpdateDepartmentRequest } from '../models/update-department.models';
import { HeaderComponent } from '../../../core/components/header/header.component';
;
@Component({
  selector: 'app-edit-department',
  imports: [RouterModule, FormsModule, CommonModule,HeaderComponent],
  templateUrl: './edit-department.component.html',
  styleUrl: './edit-department.component.css'
})
export class EditDepartmentComponent implements OnInit, OnDestroy {
  
  // add id property
  id : string | null = null;
  model?: Department;

  // add department object
  department?: Department;

  // add subscriptions
  routeSubscription?: Subscription;
  getDepartmentSubscription?: Subscription
  updateDepartmentSubscription?: Subscription;
  deleteDepartmentSubscription?: Subscription

  // add alertMessage and alertType
  alertMessage: string = '';
  alertType: string = '';

  // add constructor and inject the necessary services
  constructor(
    private router: Router,
    private route : ActivatedRoute,
    private departmentService: DepartmentService
  ){}

  // implement ngOnInit
  ngOnInit(): void {
   this.routeSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');
         if(this.id){
          this. getDepartmentSubscription = this.departmentService.getDepartmentById(this.id).subscribe({
            next: (response) =>{
              this.model = response;
            }
          });
      }
      }
    })
  }

   // implement onFormSubmit
  onFormSubmit():void{
    // convert this model to request model
    if(this.model && this.id){
      var updateDepartment: UpdateDepartmentRequest ={
        departmentName: this.model.departmentName,
        departmentCode: this.model.departmentCode,
        departmentHead: this.model.departmentHead,
        departmentAssistant: this.model.departmentAssistant,
        location: this.model.location,
        contactNumber: this.model.contactNumber
      };

      this.updateDepartmentSubscription = this.departmentService.updateDepartment(this.id, updateDepartment).subscribe({
        next: (response) => {
          this.alertMessage = 'Department Updated Successfully';
          this.alertType = 'success';
          setTimeout(() => {
            this.alertMessage = '';
            this.alertType = '';
            this.router.navigate(['/departments']);
          }, 2000);

        },
        error: (error) => {
          console.error(error);
          this.alertMessage = 'An error occurred while updating the Department'
          this.alertType = 'danger';
          setTimeout(() => {
            this.alertMessage = '';
            this.alertType = '';
            this.router.navigate(['/departments']);
          }, 2000);
        }
      });
    }
  }

  // implement onGoBack
  onGoBack(){
    this.router.navigate(['/departments']);
  }

  // implement onDelete
  onDelete(): void {
  if (this.id) {
      this.deleteDepartmentSubscription = this.departmentService.deleteDepartment(this.id)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/departments');
        }
      })
    }
 }   
   
  // implement ngOnDestroy
  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.getDepartmentSubscription?.unsubscribe();
    this.updateDepartmentSubscription?.unsubscribe();
    this.deleteDepartmentSubscription?.unsubscribe();
  }

}
