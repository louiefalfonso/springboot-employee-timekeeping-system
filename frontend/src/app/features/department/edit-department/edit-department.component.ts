import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'

import { DepartmentService } from '../services/department.service';
import { Departement } from '../models/department.models';
import { UpdateDepartmentRequest } from '../models/update-department.models';
;

@Component({
  selector: 'app-edit-department',
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './edit-department.component.html',
  styleUrl: './edit-department.component.css'
})
export class EditDepartmentComponent implements OnInit, OnDestroy {
  
  // add id property
  id : string | null = null;

  // add subscriptions
  paramsSubscription?: Subscription;
  editDepartmentSubscription?: Subscription;

  // add alertMessage and alertType
  alertMessage: string = '';
  alertType: string = '';

  // add department object
  department?: Departement;

  // add constructor and inject the necessary services
  constructor(
    private router: Router,
    private route : ActivatedRoute,
    private departmentService: DepartmentService
  ){}

  // implement ngOnInit
  ngOnInit(): void {
    // get the id of the department to edit
    this.paramsSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');
        if(this.id){
          this.departmentService.getDepartmentById(this.id).subscribe({
            next: (response)=>{this.department= response},
            error: (error) => {console.error(error);}
          });
        }
      },
    })
  }

   // implement onFormSubmit
  onFormSubmit():void{

    // create a new update object
    const updateDepartmentRequest: UpdateDepartmentRequest = {
      id: this.department?.id ?? '',
      departmentName: this.department?.departmentName ?? '',
      departmentCode: this.department?.departmentCode ?? '',
      departmentHead: this.department?.departmentHead ?? '',
      departmentAssistant: this.department?.departmentAssistant ?? '',
      location: this.department?.location ?? '',
      contactNumber: this.department?.contactNumber ?? ''
    }

    //pass this object to the service
    if(this.id){
     this.editDepartmentSubscription = this.departmentService.updateDepartment(this.id, updateDepartmentRequest)
     .subscribe({
        next: (response) => {
          this.alertMessage = 'Department updated successfully';
          this.alertType = 'success';
        },
        error: (error) => {
          this.alertMessage = 'Error updating department';
          this.alertType = 'danger';
        }
      });
    }
  }

  // implement ngOnDestroy
  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.editDepartmentSubscription?.unsubscribe();
  }

}
