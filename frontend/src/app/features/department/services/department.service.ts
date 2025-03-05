import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Departement } from '../models/department.models';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http: HttpClient) { }

  addDepartment(model : Departement) : Observable<void>{
    return this.http.post<void>(`${environment.apiBaseUrl}/departments`, model);
  }

  getAllDepartments(): Observable<Departement[]>{
     return this.http.get<Departement[]>(`${environment.apiBaseUrl}/departments`);
  }

  getDepartmentById(id: string): Observable<Departement>{
    return this.http.get<Departement>(`${environment.apiBaseUrl}/departments/${id}`);
  }

  updateDepartment(id: string, model : Departement) : Observable<void>{
    return this.http.put<void>(`${environment.apiBaseUrl}/departments/${id}`, model);
  }

  deleteDepartment(id: string): Observable<void>{
    return this.http.delete<void>(`${environment.apiBaseUrl}/departments/${id}`);
  }

}
