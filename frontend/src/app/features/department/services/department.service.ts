import { Injectable, model } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { Department } from '../models/department.models';
import { AddDepartmentRequest } from '../models/add-department.models';
import { UpdateDepartmentRequest } from '../models/update-department.models';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http: HttpClient) { }

  addDepartment(model : AddDepartmentRequest) : Observable<void>{
    return this.http.post<void>(`${environment.apiBaseUrl}/departments`, model);
  }

  getAllDepartments(): Observable<Department[]>{
     return this.http.get<Department[]>(`${environment.apiBaseUrl}/departments`);
  }

  getDepartmentById(id: string): Observable<Department>{
    return this.http.get<Department>(`${environment.apiBaseUrl}/departments/${id}`);
  }

  updateDepartment(id: string, updateDepartmentRequest: UpdateDepartmentRequest) : Observable<Department>{
    return this.http.put<Department>(`${environment.apiBaseUrl}/departments/${id}`, updateDepartmentRequest);
  }

  deleteDepartment(id: string): Observable<any> {
  // Set the content type to 'text/plain'
  const headers = new HttpHeaders({ 'Content-Type': 'text/plain'});

  // Delete the department
  return this.http.delete(`${environment.apiBaseUrl}/departments/${id}`, { headers, responseType: 'text' })
    .pipe(
      catchError((error) => {
        console.error(error);
        return throwError(() => error);
      })
    );
}

}
