import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

import { HeaderComponent } from '../../../core/components/header/header.component';
import { Departement } from '../models/department.models';
import { DepartmentService } from '../services/department.service';

@Component({
  selector: 'app-department-list',
  imports: [RouterModule, CommonModule, HeaderComponent],
  templateUrl: './department-list.component.html',
  styleUrl: './department-list.component.css',
})
export class DepartmentListComponent implements OnInit{

  departments$?: Observable<Departement[]>;

  constructor( private departmentService: DepartmentService){}

  ngOnInit(): void {
   this.departments$ = this.departmentService.getAllDepartments();
  }
}
